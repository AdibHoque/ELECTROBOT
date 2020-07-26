const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const mongoose = require("mongoose");

module.exports = {
    name: "setprefix",
    category: "Moderation",
    description: "Set the prefix for the server!",
    aliases: ["setupprefix","prefix"],
    usage: "setprefix <prefix>",
    run: async (client, message, args) => {
        const msg = message 
if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("YOU NEED THE `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!")
}
const pre = require("./../../Mongodb/prefix")
const prefix = args[0]

mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
/*const res = await pre.findOne({name: "prefix", preid: message.guild.id})
  let prefix = res ? res.prefix : "didnt set";
  message.channel.send(prefix)*/


pre.findOne({name: "prefix", preid: message.guild.id}).then(result => {
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            name: "prefix",
            preid: message.guild.id,
            prefix: prefix
          })
        const embed = new MessageEmbed()
        .setTitle("Prefix Changed")
        .setDescription(`The new prefix for the server is \`${prefix}\`.`)
        .setColor("#ffbf00")
        message.channel.send(embed);
        if(!result || result == []) {
 duck.save().catch(console.error);
        }else{
          pre.deleteOne({name: "prefix", preid: message.guild.id}).catch(console.error)          
          duck.save().catch(console.error)
        }
      })
        }}