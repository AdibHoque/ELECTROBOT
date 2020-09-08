const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "checklist",
    category: "Economy",
    description: "Check the list of things you can do!",
    aliases: [],
    usage: "checklist",
    run: async(client, message, args, prefix) => {
      const userResult = await u.findOne({name: "users", preid: message.author.id})
        const msg = message 
	const timeout = 8.28e7;
  const reptimeout = 43200000;
  const begtimeout = 1800000;
  const robtimeout = 1800000*2;
  const memetimeout = 1800000
if(!userResult) {
  message.channel.send(`You don't have a economy account yet, type \`${prefix}daily\` to get started!`)
}
	const daily = userResult.lastdaily;
    let d = ``;
	if (daily !== null && timeout - (Date.now() - daily) > 0) {
		const time = ms(timeout - (Date.now() - daily));
		d += `✅ Your next daily is in **${time.hours}H ${time.minutes}M ${time.seconds}S**.`
	} else {
    d += `⬛ You can claim your daily now!`;
  }
  if (userResult.lastrep !== null && reptimeout - (Date.now() - userResult.lastrep) > 0) {
		const time = ms(reptimeout - (Date.now() - userResult.lastrep));
		d += `\n✅ You can award a rep in **${time.hours}H ${time.minutes}M ${time.seconds}S**.`
	} else {
    d += `\n⬛ You can award a rep now!`;
  }
  if (userResult.lastbeg !== null && begtimeout - (Date.now() - userResult.lastbeg) > 0) {
		const time = ms(begtimeout - (Date.now() - userResult.lastbeg));
		d += `\n✅ Your can beg again in **${time.minutes}M ${time.seconds}S**.`
	} else {
    d += `\n⬛ You can beg now!`;
  }
  if (userResult.lastrob !== null && robtimeout - (Date.now() - userResult.lastrob) > 0) {
    const time = ms(robtimeout - (Date.now() - userResult.lastrob));
		d += `\n✅ You can rob again in **${time.hours}H ${time.minutes}M ${time.seconds}S**.`
  } else {
    d += `\n⬛ You can rob now!`
  }
  if (userResult.lastmeme !== null && memetimeout - (Date.now() - userResult.lastmeme) > 0) {
    const time = ms(memetimeout - (Date.now() - userResult.lastmeme));
    d += `\n✅ You can post meme again in **${time.hours}H ${time.minutes}M ${time.seconds}S**.`
  } else {
    d += `\n◼️ You can post meme now!`
  }
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag,message.author.avatarURL({format:"png",dynamic:true,size:512}))
  .setDescription(d)
  message.channel.send(embed)
}
}