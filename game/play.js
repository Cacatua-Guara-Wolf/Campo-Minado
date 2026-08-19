module.exports = {
	async play({ interaction, board }) {
		const filter = (message) =>
			message.author.id === interaction.user.id && !message.author.bot;
		try {
			const collected = await interaction.channel.awaitMessages({
				filter,
				max: 1,
				time: 60000,
			});

			if (collected.size === 0) {
				await interaction.message.edit({
					content: `Você demorou demais para responder. O jogo foi cancelado.`,
					components: []
				});
				return;
			}

			const reply = collected.first();

			await reply.delete()
				.catch((error) => {
					console.warn('Não foi possível apagar a mensagem do jogador:', error.message);
				});
			
			const position_regex = /^[a-zA-Z][0-9]$/;
			if (!position_regex.test(reply.content)) {
				await interaction.message.edit({
					content: `Valor ${reply.content} inválido. O jogo foi cancelado.`,
					components: []
				});
				return;
			}

			await interaction.message.edit({
				content: `${board}`,
				components: []
			});

			await require('./reload_board.js').reload_board({
				position: reply.content
			});
		} catch (error) {
			console.error('Erro ao processar a jogada:', error);
		}
	},
};