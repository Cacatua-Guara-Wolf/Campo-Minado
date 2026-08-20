const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const EMOJI = require('../../common/emojis.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('iniciar_jogo')
		.setDescription('Inicia um novo jogo')
		
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
		const play_button = new ButtonBuilder()
			.setCustomId('play')
			.setLabel('Jogar')
			.setStyle(ButtonStyle.Primary);

		const flag_button = new ButtonBuilder()
			.setCustomId('flag')
			.setLabel('Bandeira')
			.setStyle(ButtonStyle.Primary);

		const leave_button = new ButtonBuilder()
			.setCustomId('leave')
			.setLabel('Abandonar')
			.setStyle(ButtonStyle.Secondary);

		const buttons = new ActionRowBuilder().addComponents(
			play_button,
			flag_button,
			leave_button
		);

		const rows = interaction.options.getInteger('linhas') || 7;
		const columns = interaction.options.getInteger('colunas') || 7;
		// // Piso da média entre linhas e colunas ± 1
		// const bomb_count = Math.floor((rows + columns) / 2) + (Math.round(Math.random()) * (Math.random > 0.5 ? 1 : -1))
		const board = blank_board(rows, columns)

		const response = await interaction.reply({
			content: board,
			components: [ buttons ],
			withResponse: true
		});

		const collectorFilter = (i) => i.user.id === interaction.user.id;
		try {
			const confirmation = await response.resource.message.awaitMessageComponent({
				filter: collectorFilter,
				time: 60000
			});

			switch(confirmation.customId) {
				case 'play':
					game_action_play(confirmation, rows, columns);
					break;

				case 'flag':
					game_action_flag_button(confirmation, board);
					break;

				case 'leave':
					game_action_leave(confirmation, board);
					break;
			}
		} catch {
			await interaction.editReply({ content: 'Nenhum botão clicado dentro de 1 minuto, cancelando', components: [] });
		}
	},
};

function blank_board(rows, columns) {
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

async function game_action_play(confirmation, rows, columns) {
	await require('../../game/play.js').first_move({
		interaction: confirmation,
		rows,
		columns
	});
}

async function game_action_flag(confirmation, board) {
	await confirmation.update({
		content: 'Bandeirou!',
		components: []
	});
}

async function game_action_leave(confirmation, board) {
	await confirmation.update({
		content: 'Abandonou!',
		components: []
	});
}