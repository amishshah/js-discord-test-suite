const Discord = require('discord.io');
const auth = require('../../conf/auth.json');

require('../stats');

const client = new Discord.Client({
  autorun: true,
  token: auth.token,
  messageCacheLimit: 1000,
});

client.once('ready', () => {
  console.log('ready');
  client.getAllUsers();
});

client.once('allUsers', () => {
  console.log('All users received');
});

client.on('message', (user, userID, channelID, message) => {
  if (message !== '!ping') {
    return;
  }
  client.sendMessage({
    to: channelID,
    message: '!pong!',
  });
});

setInterval(() => {
  process.send({
    t: 'cache-stats',
    d: {
      users: Object.keys(client.users).length,
      guilds: Object.keys(client.servers).length,
      channels: Object.keys(client.channels).length + Object.keys(client.directMessages).length,
    },
  });
}, 500);
