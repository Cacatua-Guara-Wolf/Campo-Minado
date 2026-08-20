const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { console_log } = require('../common/console.js')
const EMOJI = require('../common/emojis.js');
const ANSI = require('../common/ansi.js');
const game_state = require('./state.js');

module.exports = {
	async move({ interaction, rows, columns }) {
		if (!game_state.bombs_positioned) game_state.board = blank_board(rows, columns);

		move(interaction);
	},
};

async function move(interaction) {
	await update_message(interaction, convert_board_to_text(game_state.board) + waiting_text('Jogar', interaction), []);
	
	const move_ephemeral = await interaction.followUp({
		content: 'Em que posição você deseja jogar? (responda letra + número)',
		ephemeral: true
	});
	
	const filter = (message) =>
		message.author.id === interaction.user.id && !message.author.bot;
	try {
		const collected = await interaction.channel.awaitMessages({
			filter,
			max: 1,
			time: 120000,
		});

		await interaction.deleteReply(move_ephemeral.id).catch(() => {});
		
		// Timeout (it really need to END the game?)
		if (collected.size === 0) {
			// could have a "start new game" button
			await update_message(interaction, `Você demorou demais para responder (2 minutos). O jogo foi cancelado, inicie um novo com \`/iniciar_jogo\``, []);
			return;
		}

		const reply = collected.first();
		reply.content = reply.content.replaceAll(' ', '');

		await reply.delete()
			.catch((error) => {
				console_log(`Não foi possível apagar a mensagem de ${interaction.member?.displayName}: ${ANSI.YELLOW}${error.message}${ANSI.RESET}`, 'warn');
			});
		
		// Invalid move
		// >>>>>>>>>>>>>>>>>>>> todo <<<<<<<<<<<<<<<<<<<<
		if (!is_move_valid(reply.content)) {
			await update_message(interaction, convert_board_to_text(game_state.board), [game_buttons()]);

			await interaction.followUp({
				content: `Upa, "${reply.content}" não é uma jogada válida! Ação cancelada, tente novamente`,
				ephemeral: true
			});
			return;
		}
		
		// Valid move, updating the board
		// >>>>>>>>>>>>>>>>>>>> todo <<<<<<<<<<<<<<<<<<<<
		update_board(reply.content);

		await interaction.message.edit({
			content: convert_board_to_text(game_state.board),
			components: [game_buttons()]
		});

	} catch (error) {
		console_log(`Erro ao processar a jogada de ${interaction.member?.displayName}: ${ANSI.RED}${error}${ANSI.RESET}`, 'error');
	}
}

async function update_message(interaction, content, components) {
	await interaction.update({
		content: content,
		components: components
	});
}

function is_move_valid(move_position) {
	const move_validator_regex = /^[a-iA-I][1-9]$/;
	if (!move_validator_regex.test(move_position)) { return false };

	return game_state.board[position(move_position)['ROW']][position(move_position)['COLUMN']] == EMOJI.HIDDEN;
}

function update_board(move_position) {
	game_state.board[position(move_position)['ROW']][position(move_position)['COLUMN']] = EMOJI.BOMB;
}

function position(move_position) {
	const move_row = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8 }[move_position[0].toUpperCase()];
	const move_column = move_position[1] - 1;

	return { 'ROW': move_row, 'COLUMN': move_column };
}

function waiting_text(action, interaction) {
	return `**Selecionado:** ${action}\n-# ${EMOJI.LOAD} Aguardando ${interaction.member?.displayName}`;
}

function blank_board(rows, columns) {
	let board = [];

	for (let i = 0; i < rows; i++) {
		let r = [];

		for (let j = 0; j < columns; j++) {
			r.push(EMOJI.HIDDEN);
		}

		board.push(r);
	}

	return board;
}

function convert_board_to_text() {
	let board = '';
	
	for (let i = 0; i < game_state.board.length; i++) {
		for (let j = 0; j < game_state.board[0].length; j++) {
			board += game_state.board[i][j]
		}

		if (i < game_state.board.length) {
			board += '\n'
		}
	}

	return board;
}

function game_buttons() {
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
	
	return new ActionRowBuilder().addComponents(
		play_button,
		flag_button,
		leave_button
	);
}