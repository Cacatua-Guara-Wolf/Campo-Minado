const { Events, MessageFlags, Collection } = require('discord.js');
const { console_log } = require('../common/console.js');
const ANSI = require('../common/ansi.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console_log(`Nenhum comando ${interaction.commandName} foi encontrado.`, 'error');
			return;
		}

		const { cooldowns } = interaction.client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({
					content: `Aquieta, \`/${command.data.name}\` ainda está em _cooldown_. Você pode utilizar novamente: <t:${expiredTimestamp}:R>.`,
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console_log(`Não foi possível executar o comando: ${ANSI.RED}${error}${ANSI.RESET}`, 'error');
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'Houve um erro ao tentar executar este comando!',
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: 'Houve um erro ao tentar executar este comando!',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
};