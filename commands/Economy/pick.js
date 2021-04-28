const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const db = require('quick.db')
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

Array.prototype.random = function(){
  return this[Math.floor(Math.random()*this.length)];
}  

module.exports = {
    name: "pick",
    category: "Economy",
    description: "Pickup money from dropped wallets!",
    aliases: ["return"],
    usage: "pick",
    run: async(client, message, args, prefix) => {
        const msg = message 
        const userResult = await u.findOne({name: "users", preid: message.author.id}) 
        if(!userResult) return message.channel.send(`You don't have an economy account yet, please get started doing \`${prefix}daily\``);
        const amount = await db.get(`wallet${message.channel.id}`)
        if(!amount) return message.channel.send("There's no dropped wallet in this channel!")
      userResult.balance = userResult.balance+amount
      await userResult.save()
      await db.delete(`wallet${message.channel.id}`)
      const arr = ['chatbot', 'define', 'snipe', 'editsnipe', 'invite', 'invite', 'invite', 'math', 'avatar', 'hug', 'cuddle', 'meme', 'meme', 'meme', 'meme', 'meme', 'joke', 'joke', 'joke', 'joke', 'joke', 'howgay', 'slap', 'tictactoe', 'tictactoe', 'tictactoe', 'triggered', 'wasted', 'profile', 'daily', 'checklist'] 
      const cmdname = arr.random()
message.channel.send(`You picked up the wallet & got **$${amount}**!\n\n**TIP:** Try checking out our \`${prefix+cmdname}\` Command.`)
        }
    }  
