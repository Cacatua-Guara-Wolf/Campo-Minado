const { Events } = require('discord.js');
const ANSI = require('../common/ansi.js');
const { time: TIME } = require('../common/time.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${TIME()} ${ANSI.GREEN}Tudo certo!${ANSI.RESET} Atualmente rodando como ${ANSI.CYAN}${client.user.tag}${ANSI.RESET}`);
	},
};