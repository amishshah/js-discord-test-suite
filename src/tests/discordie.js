const Discordie = require('discordie');
const auth = require('../../conf/auth.json');

require('../stats');

const client = new Discordie();

client.connect({ token: auth.token });

client.Dispatcher.on('GATEWAY_READY', e => {
  console.log('ready!');
  client.Users.fetchMembers()
    .then(() => console.log('received all members'));
});

client.Dispatcher.on('MESSAGE_CREATE', e => {
  if (e.message.content === '!ping') {
    e.message.channel.sendMessage('!pong!');
  }
});
