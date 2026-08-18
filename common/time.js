const ANSI = require('./ansi.js');

module.exports = {
	time: () => `${ANSI.GRAY}[${new Date().toLocaleTimeString()}]${ANSI.RESET}`,
}