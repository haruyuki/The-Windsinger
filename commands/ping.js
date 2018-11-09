exports.run = (client, message, args) => {
  message.channel.send(`Pong! Latency: ${client.pings}ms`).catch(err => console.log(err));
};