
const { 
    Client, Events, 
    GatewayIntentBits,
    Collection

} = require('discord.js');

require('dotenv').config()

const { clientReadyHandler } = require('./events/clientReady');
const { interactionCreateHandler } = require('./events/interactionCreateHandler');



const pingCommand = require('./commands/ping');
const forecastCommand = require('./commands/forecast');
const astroCommand = require('./commands/astro');



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);


client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);



client.login();


