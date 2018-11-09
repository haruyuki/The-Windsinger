module.exports = async client => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("fr!help | FR: haruyuki", {type: "PLAYING"})
    .then(presence => console.log(`Activity set to "${presence.game ? presence.game.name : "none"}"`))
    .catch(console.error);
  client.user.setStatus("online").catch(err => console.log(err));
};
