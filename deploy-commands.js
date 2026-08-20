const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const { console_log } = require('./common/console.js');
const ANSI = require('./common/ansi.js');
const path = require('node:path');
const fs = require('node:fs');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console_log(`O comando ${ANSI.YELLOW}${folder}${ANSI.RESET}/${ANSI.YELLOW}${file.replace('.js', '')}${ANSI.RESET} não tem a propriedade data ou execute e não será carregado.`, 'warn');
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console_log(`Iniciando o recarregamento de ${ANSI.CYAN}${commands.length}${ANSI.RESET} comandos de barra (/) do bot...`);

		const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console_log(`Recarregados ${ANSI.GREEN}com sucesso${ANSI.RESET} ${ANSI.CYAN}${data.length}${ANSI.RESET} comandos de barra (/) do bot:\n${ANSI.GRAY}${data.map(c => c.name).join(', ')}${ANSI.RESET}`);
	} catch (error) {
		console_log(`${ANSI.RED}${error}${ANSI.RESET}`, 'error');
	}
})();