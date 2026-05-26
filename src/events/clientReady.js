const { REST, 
    Routes
 } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function clientReadyHandler(client) {
    try {
        console.log('logged in as ' + client.user.tag);
        console.log('started refreshing ' + client.commands.size + ' application commands.');

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: client.commands.map((command) => command.data.toJSON())
            }
        );

        console.log('successfully reloaded ' + data.length + ' application commands.');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    clientReadyHandler
};