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
if(!args[0] || args[0] == "1") {
        let arr = []
	const res = await u.find( {balance: {$exists: true}}).sort([['balance', 'descending']]).limit(15)
	
res.forEach(r => {
arr.push(`**${res.indexOf(r)+1}. ${r.usertag ? r.usertag : r.preid}** - $${r.balance}`)
})
	    const embed = new Discord.MessageEmbed()
	    .setTitle("Leaderboard")
	    .setDescription(arr.join("\n"))
	    .setColor("#FFBF00")
            .setFooter("Page 1 out of 2")
	    return message.channel.send(embed)	
}
if(args[0] == "2") {
let arr = []
	const res = await u.find( {balance: {$exists: true}}).sort([['balance', 'descending']]).limit(30)
	const res2 = res.slice(15)
res2.forEach(r => {
arr.push(`**${res.indexOf(r)+1}. ${r.usertag ? r.usertag : r.preid}** - $${r.balance}`)
})
	    const embed = new Discord.MessageEmbed()
	    .setTitle("Leaderboard")
	    .setDescription(arr.join("\n"))
	    .setColor("#FFBF00")
            .setFooter("Page 2 out of 2")
	    return message.channel.send(embed)	
}
}
}
