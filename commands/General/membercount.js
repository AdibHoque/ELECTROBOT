const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "membercount",
    category: "General",
    description: "Check membercount of the server!",
    aliases: ["mc"],
    usage: "membercount",
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`Membercount`)
        .addField(`Total Members`,`${message.guild.members.cache.size}`)
        .addField(`User Count`, `${message.guild.members.cache.filter(member => !member.user.bot).size}`)
        .addField(`Bot Count`, `${message.guild.members.cache.filter(member => member.user.bot).size}`)
        .setColor(`#ffbf00`)
        message.channel.send(embed)
        }
    }  