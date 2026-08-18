const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Responde com o que você enviar')
		
		.addStringOption((option) => option
			.setName('input')
			.setDescription('O que será repetido')
			.setRequired(true)
			.setMaxLength(2000)
		)

		.addChannelOption((option) => option
			.setName('channel')
			.setDescription('O canal onde a mensagem será enviada')
			.addChannelTypes(ChannelType.GuildText)
		),
	
	async execute(interaction) {
		const message = interaction.options.getString('input');
		const channel = interaction.options.getChannel('channel') || interaction.channel;

		await channel.send({ content: message });

		await interaction.reply({ content: `Mensagem enviada para ${channel}`, ephemeral: true });
	}
};