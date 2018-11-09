exports.run = (client, message, args) => {
  message.channel.send(`Pong! Latency: ${Math.round(client.ping)}ms`).catch(err => console.log(err));
};

exports.conf = {
  aliases: []
};

exports.help = {
  name : "ping",
  description: "Ping/Pong command.",
  usage: "ping"
};