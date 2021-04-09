const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const mongoose = require("mongoose");
const guildData = require("./../../Mongodb/guild")

module.exports = {
    name: "leavechannel",
    category: "Moderation",
    description: "Set the leave message channel!",
    aliases: ["leave-message-channel", "setleavechannel", "setlc"],
    usage: "leavechannel <#channel>",
    run: async(client, message, args) => { 
        const msg = message 

if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("YOU NEED THE `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!")
}

let cArgs = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!cArgs)
      return message.channel.send(
        "You must specify a valid id for the leave message channel!"
      ); 


guildData.findOne({name: "guild", preid: message.guild.id}).then(result => {
      
        if(!result) {
let duck = new guildData({
            _id: new mongoose.Types.ObjectId(),
            name: "guild",
            preid: message.guild.id,
            leavechannel: cArgs
          }) 
 duck.save().catch(console.error);
const embed = new MessageEmbed()
        .setTitle("Leave Channel Set")
        .setDescription(`Goodbye Text Will Be Deliverd To <#${cArgs}> Everytime Someone Leaves.`)
        .setColor("#ffbf00")
       return message.channel.send(embed); 
        }
      else{
          result.leavechannel = cArgs
          result.save().catch(console.error);

          const embed = new MessageEmbed()
        .setTitle("Join Channel Set")
        .setDescription(`Goodbye Text Will Be Deliverd To <#${cArgs}> Everytime Someone Leaves.`)
        .setColor("#ffbf00")
        return message.channel.send(embed); 
        }
      })
        }}  
