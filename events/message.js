module.exports = (client, message) => {
  if (message.author.bot || message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  console.log(`${command} command ran.`);

  if (!cmd) return;
  cmd.run(client, message, args);
};
