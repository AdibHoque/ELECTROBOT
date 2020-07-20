const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "setuplogs",
    category: "Moderation",
    description: "Set starboard channel for the server!",
    aliases: ["logchannel", "setlogchannel"],
    Usage: "setuplogs <#channel>",
    run: async(client, message, args) => {
        const logchannel = message.mentions.channels.first()
        if(!logchannel) return message.channel.send(`Please mention a valid channel!`);
        const noperms = new Discord.MessageEmbed()
        .setTitle(message.author.tag)
        .setDescription(`PLEASE SPECIFY A CHANNEL TO SET!`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("YOU NEED TO `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!");
        if(!args[0]) return message.channel.send(noperms);
           db.set(`log${message.guild.id}`, logchannel.id).then
           const embed = new Discord.MessageEmbed()    
           .setDescription(`STARBOARD CHANNEL WAS CHANGED TO \`${logchannel}\``)
           .setColor(`#ffbf00)`)
           message.channel.send(embed);

        }
    }