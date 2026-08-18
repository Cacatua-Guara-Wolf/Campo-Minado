const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Recarrega um comando.')
		.addStringOption((option) => option.setName('command').setDescription('O comando a ser recarregado.').setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`Não há comando com o nome \`${commandName}\`!`);
		}
	},
};