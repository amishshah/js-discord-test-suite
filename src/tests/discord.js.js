const Discord = require('discord.js');
const auth = require('../../conf/auth.json');

require('../stats');

const client = new Discord.Client({
  fetchAllMembers: true,
  messageCacheMaxSize: 1000,
});

client.on('ready', () => {
  console.log('ready!');
});

client.on('message', message => {
  if (message.content === '!ping') {
    message.channel.send('discord.js says !pong!');
  }
});

client.login(auth.token);

setInterval(() => {
  process.send({
    t: 'cache-stats',
    d: {
      users: client.users.size,
      guilds: client.guilds.size,
      channels: client.channels.size,
    },
  });
}, 500);
