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
const guilds = require("./../../Mongodb/guilds")
const prefix = args[0]

if(!prefix) return message.channel.send("PLEASE SPECIFY THE PREFIX YOU WANT TO SET!")

mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
 
const guildResult = await guilds.findOne({name: "guilds", _id: message.guild.id})

if(!guildResult) {
let duck = new guilds({
            _id: new mongoose.Types.ObjectId(), 
            preid: message.guild.id,
            name: "guilds",
            prefix: prefix
          })
await duck.save()
        const embed = new MessageEmbed()
        .setTitle("Prefix Changed")
        .setDescription(`The new prefix for the server is \`${prefix}\`.`)
        .setColor("#ffbf00")
        message.channel.send(embed);
        }
else {
    await require('./../../Mongodb/guilds.js').updateOne({ _id: message.author.id }, { prefix: prefix });
    const embed = new MessageEmbed()
        .setTitle("Prefix Changed")
        .setDescription(`The new prefix for the server is \`${prefix}\`.`)
        .setColor("#ffbf00")
        message.channel.send(embed); 
    }
    }}
