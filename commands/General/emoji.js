const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "emoji",
    category: "General",
    description: "Get the url of the emoji!",
    aliases: ["se"],
    usage: "emoji <:emoji:>",
    run: async(client, message, args) => {
        const e = message.guild.emojis.cache.find(r => r.name === args[0]) || message.guild.emojis.cache.find(r => "<:"+r.name+":"+r.id+">" === args[0]) || message.guild.emojis.cache.find(r => ":"+r.name+":"=== args[0]) || message.guild.emojis.cache.get(args[0])
        if(!e) {
          message.channel.send("No emojis found with that name or ID. Please make sure the name is exact as it is case sensitive!")
          return;
        }
        message.channel.send(e.url)
        }
    } 