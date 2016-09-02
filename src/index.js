const childProcess = require('child_process');
const express = require('express');
const eventsource = require('express-eventsource');
const cors = require('cors');

require('open')('./index.html');

const sse = eventsource({
  connections: 2,
});

const sendMessage = sse.sender('message');

const app = express()
  .use(cors())
  .use(sse.middleware())
  .listen(3000);

function spawnTest(file) {
  const proc = childProcess.fork(file, null, console.log);
  const lib = file.split('/')[2];
  proc.on('message', m => {
    sendMessage({
      lib,
      t: m.t,
      d: m.d,
    });
  });
}

[
  'src/tests/discordie',
  'src/tests/discord.js',
  'src/tests/discord.io',
  'src/tests/eris',
].map((file, index) => setTimeout(() => spawnTest(file), index * 6000));
