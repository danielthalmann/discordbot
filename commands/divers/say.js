const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			memberName: 'say',
			group: 'divers',
//			aliases: [],
			description: 'Replies with a say message.',
			guildOnly: false,
			clientPermissions: ['SEND_MESSAGES'], // le bot doit avoir la permission d'envoyer des messages
//			userPermissions: ['ADMINISTRATOR'], // l'utilisateur doit être administrateur pour exécuter la commande
//			ownerOnly: true, // Uniquement le propriétaire du bot pourra lancer cette commande
			throttling: {
				usages: 2,
				duration: 10,
			},

			args: [
				{
					key: 'text',
					prompt: 'Qu\'est-ce que tu veux que je dises ?',
					type: 'string',
				},
			],
		});
	}
	async run(msg, { text } ) {

		msg.say(`On m\'a demandé de dire : ${text}`);

	}
};

