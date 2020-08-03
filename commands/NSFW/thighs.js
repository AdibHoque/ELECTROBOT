const {MessageEmbed} = require("discord.js")
const {get} = require('request-promise-native')
const nsfwembed = new MessageEmbed().setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`).setColor(`#ff0000`);
module.exports = {
    name: "thighs",
    category: "NSFW",
    description: "Sexy thighs!",
    aliases: ["thigh"],
    Usage: "thighs",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      let options = {
url: "https://nekobot.xyz/api/image?type=thigh",
json: true
      }
      get(options).then(async body => {
const p = body.message.replace("https://cdn.nekobot.xyz/","https://electro-bot.glitch.me/api/img/")
message.channel.send(p)
})
    }
    else message.channel.send(nsfwembed)
  } 
  } 