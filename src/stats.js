setInterval(() => {
  process.send({
    t: 'ram',
    d: {
      memory: process.memoryUsage(),
    },
  });
}, 1000);
