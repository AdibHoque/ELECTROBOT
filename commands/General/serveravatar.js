const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "serveravatar",
    category: "General",
    description: "Check Your Avatar!",
    aliases: ["serverav", "sav"],
    Usage: "serveravatar",
    run: async(client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .setImage(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor(`#ffbf00`)
    message.channel.send(embed)
        
        }
    }   