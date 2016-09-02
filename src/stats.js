setInterval(() => {
  process.send({
    t: 'ram',
    d: {
      memory: process.memoryUsage(),
    },
  });
}, 200);
