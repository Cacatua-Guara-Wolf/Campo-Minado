const ANSI = require('./ansi.js');

module.exports = {
	console_log(content, type = '') {
		switch(type) {
			case 'warn':
				console.warn(`${time()} ${tag(type)} ${content}`);
				break;
			
			case 'error':
				console.error(`${time()} ${tag(type)} ${content}`);
				break;
			
			default:
				console.log(`${time()}${tag(type)} ${content}`);
		}
	}
}

function time() {
	return `${ANSI.GRAY}[${new Date().toLocaleTimeString()}]${ANSI.RESET}`;
}

function tag(tag) {
	switch(tag) {
		case 'warn':
			return `${ANSI.YELLOW}[AVISO]${ANSI.RESET}`;
		
		case 'error':
			return `${ANSI.RED}[ERRO]${ANSI.RESET}`;

		case '':
			return ``;

		default:
			return ` ${ANSI.CYAN}[${tag.toUpperCase()}]${ANSI.RESET}`;
	}
}