const { Events } = require('discord.js');
const { console_log } = require('../common/console.js')
const ANSI = require('../common/ansi.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console_log(`${ANSI.GREEN}Tudo certo!${ANSI.RESET} Atualmente rodando como ${ANSI.CYAN}${client.user.tag}${ANSI.RESET}`);
	},
};