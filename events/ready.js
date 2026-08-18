const { Events } = require('discord.js');
const ANSI = require('../common/ansi.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${ANSI.GREEN}Tudo certo!${ANSI.RESET} Atualmente rodando como ${ANSI.CYAN}${client.user.tag}${ANSI.RESET}`);
	},
};