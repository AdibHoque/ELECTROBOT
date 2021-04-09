const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const mongoose = require("mongoose");
const guildData = require("./../../Mongodb/guild")

module.exports = {
    name: "joinchannel",
    category: "Moderation",
    description: "Set the join message channel!",
    aliases: ["join-message-channel", "setwelcomer", "setjc"],
    usage: "joinchannel <#channel>",
    run: async(client, message, args) => { 
        const msg = message 

if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("YOU NEED THE `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!")
}

let cArgs = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!cArgs)
      return message.channel.send(
        "You must specify a valid id for the welcome channel!"
      ); 


guildData.findOne({name: "guild", preid: message.guild.id}).then(result => {
      
        if(!result) {
let duck = new guildData({
            _id: new mongoose.Types.ObjectId(),
            name: "guild",
            preid: message.guild.id,
            joinchannel: cArgs
          }) 
 duck.save().catch(console.error);
const embed = new MessageEmbed()
        .setTitle("Join Channel Set")
        .setDescription(`Greetings Text Will Be Deliverd To <#${cArgs}> Everytime Someone Joins.`)
        .setColor("#ffbf00")
       return message.channel.send(embed); 
        }
      else{
          result.joinchannel = cArgs
          await result.save()
          const embed = new MessageEmbed()
        .setTitle("Join Channel Set")
        .setDescription(`Greetings Text Will Be Deliverd To <#${cArgs}> Everytime Someone Joins.`)
        .setColor("#ffbf00")
        return message.channel.send(embed); 
        }
      })
        }} 
