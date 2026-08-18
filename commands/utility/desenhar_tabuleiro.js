const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const EMOJI = require('../../common/emojis.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('desenhar_tabuleiro')
		.setDescription('Desenha os campos de um tabuleiro novo')
		
		.addIntegerOption((option) => option
			.setName('linhas')
			.setDescription('Número de linhas do tabuleiro')
			.setMinValue(5)
			.setMaxValue(9) // The maximum is 9, or else Discord don't accept (message too big)
		)
		
		.addIntegerOption((option) => option
			.setName('colunas')
			.setDescription('Número de colunas do tabuleiro')
			.setMinValue(5)
			.setMaxValue(9) // The maximum is 9, or else Discord don't accept (message too big)
		),
	
	async execute(interaction) {
		const leave_button = new ButtonBuilder()
			.setLabel('Abandonar')
			.setStyle(ButtonStyle.Danger);

		const buttons = new ActionRowBuilder().addComponents(leave_button);

		const rows = interaction.options.getInteger('linhas') || 7;
		const columns = interaction.options.getInteger('colunas') || 7;
		const board = blank_board(rows, columns)

		await interaction.reply({
			content: board,
			components: [ buttons ]
		});
	},
};

function blank_board(rows, columns){
	let board = '';

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			board += EMOJI.HIDDEN
		}

		if (i < rows) {
			board += '\n'
		}
	}

	return board;
}