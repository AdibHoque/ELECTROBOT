const mongoose = require("mongoose");
const Discord = require("discord.js");
const pre = require("./../../Mongodb/logchannel")

mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    name: "setuplogs",
    category: "Moderation",
    description: "Set log channel for the server!",
    aliases: ["logchannel", "setlogchannel", "setlogs"],
    Usage: "setuplogs <#channel>",
    run: async(client, message, args) => {
        const logchannel = message.mentions.channels.first()
        if(!logchannel) return message.channel.send(`Please mention a valid channel!`);
        const noperms = new Discord.MessageEmbed()
        .setTitle(message.author.tag)
        .setDescription(`PLEASE SPECIFY A CHANNEL TO SET!`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("YOU NEED TO `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!");
        if(!args[0]) return message.channel.send(noperms);
          // db.set(`log${message.guild.id}`, logchannel.id).then
      pre.findOne({name: "logchannel", preid: message.guild.id}).then(result => {
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            name: "logchannel",
            preid: message.guild.id,
            logchannel: logchannel
          })
           const embed = new Discord.MessageEmbed()    
           .setDescription(`LOG CHANNEL WAS CHANGED TO ${logchannel}`)
           .setColor(`#ffbf00)`)
           message.channel.send(embed);
        if(!result || result == []) {
 duck.save().catch(console.error);
        }else{
          pre.deleteOne({name: "logchannel", preid: message.guild.id}).catch(console.error)          
          duck.save().catch(console.error)
        }
      })

        }
    }