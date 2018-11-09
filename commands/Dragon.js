exports.run = (client, message, args) => {
  const cheerio = require("cheerio");
  const request = require("superagent");

  if (args[0] === undefined) {
    message.channel.send("You didn't provide a dragon link!").catch(err => console.log(err));
  } else {
    request.get(args[0])
      .end((err, res) => {
        if (err) return console.log(err);
        let data = res.text;
        data = data.replace(/\t/g, "");  // Remove tab characters
        data = data.replace(/\n/g, "");  // Remove newline characters
        data = data.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");  // Remove all <script> tags
        data = data.replace(/<!--[\s\S]*?[\s\S]*?-->/gi, "");  // Remove all <!-- Comment --> tags
        const $ = cheerio.load(data);

        const statsDict = [];
        const stats = $("#newname fieldset div span div a span");
        let statsText = stats.text();
        statsText = statsText.match(/.{1,4}/g);
        statsText.forEach(stat => {
          const items = stat.split(/([0-9]+)/).filter(Boolean);
          statsDict.push({key: items[0], value: items[1]});
        });
        message.channel.send(statsText).catch(err => console.log(err));
      });
  }
};

exports.conf = {
  aliases: ["d"]
};

exports.help = {
  name : "dragon",
  description: "Get Dragon information from a link.",
  usage: "dragon <link>"
};

// //div[@id="newname"]/fieldset/div/span/div/span/text()  # Length, Wingspan, Weight
// //div[@id="newname"]/fieldset/div/span/div/a/span/text()  # Stats
// //div[@id="newname"]/fieldset/div/span/div/div/text()  # Type, Level, Hatchday, Colours
// //div[@id="newname"]/fieldset/div/div/span/text()  # Dragon Energy

// //div[@id="super-container"]/div/span/text()  # Dragon Name
// //div[@id="super-container"]/div/span/div/text()  # Dragon ID