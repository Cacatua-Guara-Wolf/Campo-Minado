const { SlashCommandBuilder } = require('discord.js');
const EMOJI = require('../../common/emojis.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('campos_tabuleiro').setDescription('Mostra os campos do tabuleiro atuais'),
	async execute(interaction) {
		await interaction.reply(`Estes são os campos do tabuleiro atuais:\n${EMOJI.N0}${EMOJI.N1}${EMOJI.N2}${EMOJI.N3}${EMOJI.N4}${EMOJI.N5}${EMOJI.N6}${EMOJI.N7}${EMOJI.N8}${EMOJI.HIDDEN}${EMOJI.FLAG}${EMOJI.BOMB}\nN0 N1 N2 N3 N4 N5 N6 N7 N8 HD FL BM`);
	},
};