const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const ANSI = require('./common/ansi.js');
const { time: TIME } = require('./common/time.js');

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
			console.log(`${TIME()} ${ANSI.YELLOW}[AVISO]${ANSI.RESET} O comando ${ANSI.YELLOW}${folder}${ANSI.RESET}/${ANSI.YELLOW}${file.replace('.js', '')}${ANSI.RESET} não tem a propriedade data ou execute e não será carregado.`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`${TIME()} Iniciando o recarregamento de ${ANSI.CYAN}${commands.length}${ANSI.RESET} comandos de barra (/) do bot...`);

		const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console.log(`${TIME()} Recarregados ${ANSI.GREEN}com sucesso${ANSI.RESET} ${ANSI.CYAN}${data.length}${ANSI.RESET} comandos de barra (/) do bot:\n${ANSI.GRAY}${data.map(c => c.name).join(', ')}${ANSI.RESET}`);
	} catch (error) {
		console.error(`${ANSI.RED}${error}${ANSI.RESET}`);
	}
})();