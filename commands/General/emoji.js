const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "emoji",
    category: "General",
    description: "Get the url of the emoji!",
    aliases: ["se"],
    usage: "emoji <:emoji:>",
    run: async(client, message, args) => {
        const e = message.mentions.emojis.first() || message.guild.emojis.cache.find(r => r.name === args[0])
        message.channel.send(e.url)
        }
    } 