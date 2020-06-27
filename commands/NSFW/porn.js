const {MessageEmbed} = require("discord.js")
const PornHub = require("pornhub.js");
const pornhub = new PornHub();
const options = {
    sexualOrientation: 'straight'
} 
module.exports = {
    name: "porn",
    category: "NSFW",
    description: "Get a short playable porn video!",
    aliases: ["p"],
    Usage: "porn <search text>",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      const t = args.join(" ")
      pornhub.search("gif", t, options).then(res => {
        res.data.forEach(item => {
          console.log(item.title);
          message.channel.send(`${item.title}\n${item.mp4}`);
        });
      });
    }
    else return message.channel.send(nsfwembed)
  } 
  }   