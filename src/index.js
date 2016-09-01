const childProcess = require('child_process');

function spawnTest(file) {
  const proc = childProcess.fork(file, null, console.log);
  const lib = file.split('/')[2];
  proc.on('message', m => {
    console.log(lib, m);
  });
}

[
  'src/tests/eris',
  'src/tests/discord.js',
  'src/tests/discord.io',
  'src/tests/discordie',
].map((file, index) => setTimeout(() => spawnTest(file), index * 6000));
