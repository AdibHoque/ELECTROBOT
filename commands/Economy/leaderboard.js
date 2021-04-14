const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")
const recon = require("reconlx");
const ReactionPages = recon.ReactionPages; 

module.exports = {
    name: "leaderboard",
    category: "Economy",
    description: "See the leaderboard for currency holders!",
    aliases: ["lb"],
    usage: "daily",
    run: async(client, message, args) => {
      const userResult = await u.findOne({name: "users", preid: message.author.id})
        const msg = message 
if(!args[0] || args[0] == "1" || args[0] = "2") {
        let arr1 = []
        let arr2 = []
	const res = await u.find( {balance: {$exists: true}}).sort([['balance', 'descending']]).limit(15)
        const re = await u.find( {balance: {$exists: true}}).sort([['balance', 'descending']]).limit(30)
	const res2 = re.slice(15)	
	
res.forEach(r => {
arr1.push(`**${res.indexOf(r)+1}. ${r.usertag ? r.usertag : r.preid}** - $${r.balance}`)
})
	
res2.forEach(r => {
arr2.push(`**${res2.indexOf(r)+1}. ${r.usertag ? r.usertag : r.preid}** - $${r.balance}`)
})
	    const embed1 = new Discord.MessageEmbed()
	    .setTitle("Leaderboard")
	    .setDescription(arr1.join("\n"))
	    .setColor("#FFBF00")
            .setFooter("Page 1 out of 2")
	    	
	    const embed2 = new Discord.MessageEmbed()
	    .setTitle("Leaderboard")
	    .setDescription(arr2.join("\n"))
	    .setColor("#FFBF00")
            .setFooter("Page 2 out of 2")
	    	
	    const pages = [embed1, embed2];
            const textPageChange = true;
            const emojis = ["⏪", "⏩"];
            const time = 30000;
            ReactionPages(message, pages, textPageChange, emojis, time); 
}

if(args[0] == "rep") {
        let arr = []
	const res = await u.find( {rep: {$exists: true}}).sort([['rep', 'descending']]).limit(15)
	
res.forEach(r => {
arr.push(`**${res.indexOf(r)+1}. ${r.usertag ? r.usertag : r.preid}** - ★${r.rep}`)
})
	    const embed = new Discord.MessageEmbed()
	    .setTitle("Reputation Leaderboard")
	    .setDescription(arr.join("\n"))
	    .setColor("#FFBF00")
            .setFooter("Page 1 out of 2")
	    return message.channel.send(embed)	
}  

if(args[0] == "rep" && args[1] == "2") {
let arr = []
	const res = await u.find( {rep: {$exists: true}}).sort([['rep', 'descending']]).limit(30)
	const res2 = res.slice(15)
res2.forEach(r => {
arr.push(`**${res.indexOf(r)+1}. ${r.usertag ? r.usertag : r.preid}** - ★${r.balance}`)
})
	    const embed = new Discord.MessageEmbed()
	    .setTitle("Reputation Leaderboard")
	    .setDescription(arr.join("\n"))
	    .setColor("#FFBF00")
            .setFooter("Page 2 out of 2")
	    return message.channel.send(embed)	
}
 
}
}
