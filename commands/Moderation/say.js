const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<:ElectroCross:737678614681878580>"

module.exports = {
    name: "say",
    category: "Moderation",
    description: "Make the bot repeat your text!",
    aliases: ["echo", "repeat"],
    usage: "say <text>",
    run: async(client, message, args) => {
        const msg = message 
        if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(fail+" | PLEASE SPECIFY SOMETHING TO SAY!").setColor("#ffbf00"));
        if(!msg.member.hasPermission("ADMINISTRATOR")) {
           message.channel.send(new MessageEmbed().setDescription(fail+" | YOU NEED THE `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!").setColor("#ffbf00"))
           }
      if(msg.member.hasPermission("ADMINISTRATOR")) {
      message.channel.send(args.join(" "))
      }
        }
    } 