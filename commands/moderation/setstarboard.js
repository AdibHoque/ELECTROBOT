const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "setstarboard",
    category: "Moderation",
    description: "Set starboard channel for the server!",
    aliases: ["starboard", "starchannel"],
    Usage: "setstarboard <#channel>",
    run: async(client, message, args) => {
        const starchannel = message.mentions.channels.first()
        if(!starchannel) return message.channel.send(`Please mention a valid channel!`);
        const noperms = new Discord.MessageEmbed()
        .setTitle(message.author.tag)
        .setDescription(`:x: PLEASE SPECIFY A CHANNEL TO SET!`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("YOU NEED TO `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!");
        if(!args[0]) return message.channel.send(noperms);
           db.set(`starboard${message.guild.id}`, starchannel.id).then
           const embed = new Discord.MessageEmbed()    
           .setDescription(`STARBOARD CHANNEL WAS CHANGED TO \`${starchannel}\``)
           .setColor(`#ffbf00)`)
           message.channel.send(embed);

        }
    }
}  
