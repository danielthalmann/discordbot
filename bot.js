
require('dotenv').config()
const CommandoClient = require('./client');
const path = require('path');
const winston = require('winston');

if(typeof(process.env.OWNER_ID) == 'undefined')	{
    console.log('La configuation est manquante.');
    console.log('Vous pouvez recopier le fichier .env.exemple en .env et saisir les paramètres');
    return;
}


//
// Initialisation du fichier log
//
client.logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: process.env.LOGFILE })
  ],
  format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
});


// 
// création du client
// 
const client = new CommandoClient({
//	commandPrefix: '?', // Préfixe des commandes (ex: ?help) valeur par défaut '!'
	owner: process.env.OWNER_ID, // ID de l'owner du bot, peut également être un tableau d'id pour plusieurs owners, ex: ['ID1', 'ID2']
    disableMentions: 'everyone' // Désactive, par sécurité, l'utilisation du everyone par le bot
});


// 
// enregistrement du groupe de commandes
// 
client.registry
    .registerDefaultTypes()
    .registerGroups(['divers'])
    .registerCommandsIn(path.join(__dirname, 'commands'));



client.once('ready', () => {

    console.log(`Bot prêt !`);

});


// 
// Enregistrement de l'event des messages
// 
client.on('message', async message => {
    

    //
    // Ne traite pas les messages provenant de Bot
    //
    if(message.author.bot) {
        return;
    }

    console.log(message.author.username + ' : ' + message.content);

    console.log(message);

    //
    // On recherche le nom des personnes
    //
    var arr = message.content.match(/\<@\!([0-9])*>/g);

    if(arr != null){

    	for(i=0; i < arr.length; i++){

        	let user = await client.users.fetch(arr[i].replace('<@!', '').replace('>', ''));
            arr[i] = user.username;

    	}

        message.channel.send('Dans le message, il y avait les noms de : ' + arr.join(' '));
    }

    //
    // Découpe tous les mots
    //
    words = message.content.split(' ');

    sayHello = false;

    words.forEach(word => {

        switch(word.toLowerCase()){
            case 'salut':
            case 'hello':
            case 'coucou':
            case 'bonjour':
            
            sayHello = true;

        }

    });

    if(sayHello) {

        message.channel.send('Bien le bonjour voyageur !');
        
    }

    // Si le message est "ping"
    if (message.content === 'ping') {

        // Send "pong" to the same channel
        message.channel.send('pong');

    }

});

//
// affiche dans la console les erreurs. peut-être utiliser un module qui permet d'enregistrer des logs
// 
client.on('error', console.error); 

//
// Lance le login
//
client.login(process.env.BOT_LOGIN);


//
// obtenir les informations de l'utilisateur à l'aide de l'id de l'utilisateur
//
x = (async function(){

  return await client.users.fetch(process.env.OWNER_ID);

}
)();

console.log(x);

client.users.fetch(process.env.OWNER_ID).then( user => console.log('le bot appartient à ' + user.username) );


