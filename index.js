const { Client } = require('discord.js-selfbot-v13');

const platforms = {
    desktop: 'Discord Client',
    mobile: 'Discord iOS',
    web: 'Discord Web'
};

const client = new Client({
    checkUpdate: false,
    patchVoice: true, 
});

const TOKEN = 'TOOOOOKEN';
const PREFIX = '!';

client.on('ready', () => {
    console.log(`welcome: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'status') {
        const status = args[0] || 'online'; 
        const device = args[1] || 'desktop'; 

        if (platforms[device]) {
            client.options.ws.properties.$browser = platforms[device];
        }

        try {

            client.user.setPresence({
                status: status,
                activities: []
            });

            client.destroy();
            await client.login(TOKEN);

            message.edit(`updated to **${status}** using **${device}** spoofing.`);
        } catch (err) {
            console.error(err);
            message.edit(`error updating status.`);
        }
    }
});

client.login(TOKEN);

