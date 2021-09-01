const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hello',
			memberName: 'hello',
			group: 'divers',
			aliases: ['bonjour', 'hi'],
			description: 'Replies with a hello message.',
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
					prompt: 'Quel texte voulez-vous que le bot répondre ?',
					type: 'string',
				},
			],
		});
	}
	async run(msg, { text } ) {

        msg.say(`Bonjour, je suis ${this.client.user.tag} (\`${this.client.user.id}\`)`);
		msg.say(`Votre text : ${text}`);

	}
};

