const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "serverinfo",
    category: "General",
    description: "Get info about the server!",
    aliases: ["server"],
    usage: "serverinfo",
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setAuthor(message.guild.name,message.guild.iconURL())
        .addField("Owner", `${message.guild.owner}`)
        .addField("Membercount", `${message.guild.members.cache.size} (${message.guild.members.cache.filter(member => !member.user.bot).size} Users, ${message.guild.members.cache.filter(member => member.user.bot).size} Bots)`)
        .addField("Emojis", `${message.guild.emojis.cache.size}`)
        .addField("Roles", `${message.guild.roles.cache.size}`)
        .addField("Channels", `${message.guild.channels.cache.size}`)
        .addField("Boosts", message.guild.premiumSubscriptionCount)
        .addField("Boost Level",`${message.guild.premiumTier}`)
        .setColor(`#ffbf00`)
        .setFooter(`Guild Created at ${message.guild.createdAt.toLocaleString()}`)
        message.channel.send(embed)
        }
    }  