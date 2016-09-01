const Eris = require('eris');
const auth = require('../../conf/auth.json');

require('../stats');

const bot = new Eris(auth.token, {
  getAllUsers: true,
  messageLimit: 1000,
});

bot.on('ready', () => {
  console.log('ready');
});

bot.on('messageCreate', msg => {
  if (msg.content === '!ping') {
    bot.createMessage(msg.channel.id, '!pong!');
  }
});

bot.connect();
