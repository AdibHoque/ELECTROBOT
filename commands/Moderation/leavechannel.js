const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const mongoose = require("mongoose");
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<:ElectroCross:737678614681878580>"

module.exports = {
    name: "setlogs",
    category: "Moderation",
    description: "Set the loggin channel for the server!",
    aliases: ["setuplogs","setuplogchannel","logchannel"],
    usage: "setlogs <#channel>",
    run: async (client, message, args) => {
        const msg = message 
if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("YOU NEED TO PERMISSION `ADMINISTRATOT` PERMISSION TO USE THIS COMMAND!")
}
const pre = require("./../../Mongodb/logchannel")
const lc = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
/*const res = await pre.findOne({name: "prefix", preid: message.guild.id})
  let prefix = res ? res.prefix : "didnt set";
  message.channel.send(prefix)*/


pre.findOne({name: "logchannel", preid: message.guild.id}).then(result => {
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            name: "logchannel",
            preid: message.guild.id,
            prefix: lc.id
          })
        const embed = new MessageEmbed()
        .setTitle("Logging Channel Changed")
        .setDescription(`${check} **| The new logchannel for the server is ${lc}.**`)
        .setColor("#ffbf00")
        message.channel.send(embed);
        if(!result || result == []) {
 duck.save().catch(console.error);
        }else{
          pre.deleteOne({name: "logchannel", preid: message.guild.id}).catch(console.error)          
          duck.save().catch(console.error)
        }
      })
        }}