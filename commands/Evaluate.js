exports.run = (client, message, args) => {
  if (message.author.id !== client.config.ownerID) return;

  const cleanup_code = text => {
    if (text.startsWith("```") && text.endsWith("```")) {
      const temp = text.split("\n");
      temp.shift();
      temp.pop();
      return temp.join(" ");
    } else
      return text;
  };

  const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  };

  try {
    const code = cleanup_code(args.join(" "));
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"}).catch(err => console.log(err));
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).catch(err => console.log(err));
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name : "eval",
  description: "Evaluate NodeJS code.",
  usage: "eval <code>"
};
