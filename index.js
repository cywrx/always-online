const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
});


const TOKEN = 'token';
const PREFIX = '&'; 

client.on('ready', async () => {
  console.log(`welcome ${client.user.tag}!`);
  console.log(`current platform: ${client.options.ws.properties.$browser}`);
});

client.on('messageCreate', async (message) => {
  
  if (message.author.id !== client.user.id) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'status') {
    const status = args[0] || 'online';
    const device = args[1] || 'desktop';

    const platforms = {
        desktop: 'Discord Client',
        mobile: 'Discord iOS',
        web: 'Discord Web'
    };

    client.setPresence({
        status: status,
        activities: [] 
    });

    client.options.ws.properties.$browser = platforms[device] || platforms.desktop;
    
    client.destroy();
    client.login(TOKEN);
    
    message.edit(`status updated: **${status}** on **${device}**`);
  }
});

client.login(TOKEN);
