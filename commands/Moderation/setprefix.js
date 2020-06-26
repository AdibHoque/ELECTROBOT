const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "setprefix",
    category: "Moderation",
    description: "Set bot prefix for the server!",
    aliases: ["prefix", "sprefix"],
    Usage: "setprefix <prefix of your choice>",
    run: async(client, message, args) => {
        const noperms = new Discord.MessageEmbed()
        .setTitle(message.author.tag)
        .setDescription(`:x: PLEASE SPECIFY A PREFIX TO SET!`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("YOU NEED TO `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!");
        let newprefix = args.join(" ");
        if(!args[0]) return message.channel.send(noperms);
        if(!args[1]) {
           db.set(`prefix_${message.guild.id}`, newprefix).then
           const embed = new Discord.MessageEmbed()    
           .setDescription(`PREFIX WAS CHANGED TO \`${newprefix}\``)
           .setColor(`#ffbf00)`)
           message.channel.send(embed);
        }
    }
    
} 