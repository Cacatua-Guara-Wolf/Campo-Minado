const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ANSI = require('../../common/ansi.js');
const { console_log } = require('../../common/console.js');

const findCommandFile = (commandName) => {
	const commandsDir = path.join(__dirname, '..');
	
	const searchRecursive = (dir) => {
		const files = fs.readdirSync(dir);
		
		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);
			
			if (stat.isDirectory()) {
				const result = searchRecursive(filePath);
				if (result) return result;
			} else if (file.endsWith('.js')) {
				try {
					// Lê o arquivo sem require para extrair o nome
					const fileContent = fs.readFileSync(filePath, 'utf8');
					const nameMatch = fileContent.match(/\.setName\(['"`]([^'"`]+)['"`]\)/);
					
					if (nameMatch && nameMatch[1].toLowerCase() === commandName.toLowerCase()) {
						return path.resolve(filePath);
					}
				} catch (e) { }
			}
		}
		return null;
	};
	
	return searchRecursive(commandsDir);
};

const clearRequireCache = (modulePath) => {
	Object.keys(require.cache).forEach(key => {
		if (key.includes(modulePath) || require.cache[key].filename === modulePath) {
			delete require.cache[key];
		}
	});
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Recarrega um comando.')

		.addStringOption((option) => option
			.setName('command')
			.setDescription('O comando a ser recarregado.')
		),
	
	async execute(interaction) {
		if(!interaction.options.getString('command')) {
			// Reload everything if not specified only one command
			try {
				const deployPath = path.join(__dirname, '../../deploy-commands.js');
				delete require.cache[require.resolve(deployPath)];

				console_log(`${ANSI.YELLOW}${interaction.user.username} solicitou deploy geral via comando /reload${ANSI.RESET}`)
				require(deployPath);
				
				await interaction.reply('Todos os comandos foram recarregados com sucesso!');
				return;
			} catch (error) {
				console_log(`Ao fazer deploy dos comandos: ${ANSI.RED}${error}${ANSI.RESET}`, 'error');
				await interaction.reply(
					`Houve um erro ao recarregar todos os comandos:\n\`${error.message}\``
				);

				return;
			}
		}

		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`Não há comando com o nome \`${commandName}\`!`);
		}

		const commandFilePath = findCommandFile(commandName);
		
		if (!commandFilePath) {
			return interaction.reply(`Não foi possível encontrar o arquivo do comando \`${commandName}\`!`);
		}

		try {
			clearRequireCache(commandFilePath);
			const newCommand = require(commandFilePath);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`O comando \`${newCommand.data.name}\` foi recarregado!`);
		} catch (error) {
			console_log(`Recarregar comando ${ANSI.RED}${command.data.name}${ANSI.RESET} disparou: ${ANSI.RED}${error}${ANSI.RESET}`, 'error');
			await interaction.reply(
				`Houve um erro ao recarregar o comando \`${command.data.name}\`:\n\`${error.message}\``
			);
		}
	},
};