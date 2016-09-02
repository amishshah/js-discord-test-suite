const Eris = require('eris');
const auth = require('../../conf/auth.json');

require('../stats');

const bot = new Eris(auth.token, {
  getAllUsers: true,
  messageLimit: 1000,
});

bot.on('ready', () => {
  console.log('ready');
  const client = bot;
});

bot.on('messageCreate', msg => {
  if (msg.content === '!ping') {
    bot.createMessage(msg.channel.id, 'eris says !pong!');
  }
});

bot.connect();

setInterval(() => {
  process.send({
    t: 'cache-stats',
    d: {
      users: bot.users.size,
      guilds: bot.guilds.size,
      channels: bot.groupChannels.size + bot.privateChannels.size + Object.keys(bot.channelGuildMap).length,
    },
  });
}, 500);
