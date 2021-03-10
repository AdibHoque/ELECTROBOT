const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "rep",
    category: "Economy",
    description: "Give reputation to someone!",
    aliases: ["reputation"],
    usage: "rep <@user>",
    run: async(client, message, args, prefix) => {
      const torep = message.mentions.users.first() || client.users.cache.get(args[0])
      if(torep.id == message.author.id) return message.channel.send("You can't give reputation to yourself!");
	    
      const reper = await u.findOne({name: "users", preid: message.author.id})
      const daily = reper.lastrep;
      const timeout = 43200000;
   if(torep) {
     const userResult = await u.findOne({name: "users", preid: torep.id})
if(!userResult) {
return message.channel.send(`They don't have a economy account yet, tell them to get started by doing \`${prefix}daily\`.`)
}
     }
    if(!args[0] && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily));
      return message.channel.send(`⏱ You'll be able to use this command again in **${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds**!`)
    }
    if(!args[0] && timeout - (Date.now() - daily) < 0) {
      return message.channel.send(`You can award a reputation point!`)
    }
      
if(!reper.lastrep) {
  await require('./../../Mongodb/user.js').updateOne({ preid: torep.id }, { $inc: { rep: 1 }});
  await require('./../../Mongodb/user.js').updateOne({ preid: message.author.id }, { lastrep: Date.now() });
  return message.channel.send(`${check} You gave a reputation point to **${torep.tag}**!`)
}
      
	if (daily !== null && timeout - (Date.now() - daily) > 0) {
		const time = ms(timeout - (Date.now() - daily));
		return message.channel.send(`You have already gave your reputation today.\n⏱ You'll be able to use this command again in **${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds**!`);
	} else {
		await require('./../../Mongodb/user.js').updateOne({ preid: message.author.id }, { lastrep: Date.now() });
    await require('./../../Mongodb/user.js').updateOne({ preid: torep.id }, { $inc: { rep: 1 }});
		return message.channel.send(`${check} You gave a reputation point to **${torep.tag}**!`);
	}
}
}
