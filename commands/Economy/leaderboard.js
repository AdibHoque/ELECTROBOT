const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "leaderboard",
    category: "Economy",
    description: "See the leaderboard for currency holders!",
    aliases: ["lb"],
    usage: "daily",
    run: async(client, message, args) => {
      const userResult = await u.findOne({name: "users", preid: message.author.id})
        const msg = message 
        if(args[0].toLowerCase() == "--rep") {
        const res = await u.find( {rep: {$exists: true}}).sort([['rep','descending']])
        const user1 = res[0].usertag ? res[0].usertag : res[0].preid
      const user2 = res[1].usertag ? res[1].usertag : res[1].preid
      const user3 = res[2].usertag ? res[2].usertag : res[2].preid
      const embed = new Discord.MessageEmbed()
      .setTitle(`⭐Leaderboard`)
      .setDescription(`**${user1}** - ★${res[0].rep}\n**${user2}** - ★${res[1].rep}\n**${user3}** - ★${res[2].rep}`)
      return message.channel.send(embed)
      }
	const res = await u.find( {balance: {$exists: true}}).sort([['balance', 'descending']])
      const user1 = res[0].usertag ? res[0].usertag : res[0].preid
      const user2 = res[1].usertag ? res[1].usertag : res[1].preid
      const user3 = res[2].usertag ? res[2].usertag : res[2].preid
      const embed = new Discord.MessageEmbed()
      .setTitle(`💰Leaderboard`)
      .setDescription(`**${user1}** - $${res[0].balance}\n**${user2}** - $${res[1].balance}\n**${user3}** - $${res[2].balance}`)
      message.channel.send(embed);
}
}