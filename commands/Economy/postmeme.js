const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
const ms = require('parse-ms')
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "postmeme",
    category: "Economy",
    description: "Post memes!",
    aliases: ["pm"],
    usage: "pm",
    run: async(client, message, args, prefix) => {
        const msg = message 
        const userResult = await u.findOne({name: "users", preid: message.author.id})
        const daily = userResult.lastmeme ? userResult.lastmeme: 0
        const timeout = 1800*1000
	if (daily !== null && timeout - (Date.now() - daily) > 0) {
		const time = ms(timeout - (Date.now() - daily));
		return message.channel.send(`You have already posted memes this hour.\n⏱ You'll be able to use this command again in **${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds**!`);
	} 
        const upvotes = Math.floor(Math.random() * (1500 - (-1000) + 1) + (-1000));
        const rev = Math.round((upvotes/100)*20);
        const revenue = rev > 1 ? rev : 0
      let s = null
      if(upvotes > 1) s = `Your meme got ${upvotes} upvotes. You get $${revenue} coins from the ads`
      if(upvotes < 1) s = `Everyone hates your meme, and it ended up with ${upvotes} upvotes. You get nothing!`
      message.channel.send(`__What type of meme do you want to post?__\n\`n\` ■  Normie Meme\n\`e\` ■  Edgy meme\n\`r\` ■  Repost meme\n\`d\` ■  Dank meme`);
	message.channel.awaitMessages(m => m.author.id == message.author.id, {
		max: 1,
		time: 30000,
		errors: ['time'],
	}).then(async collected => {
		if (!collected.first()) return;
		if (collected.first().content.toLowerCase() == 'n') {
     userResult.balance = userResult.balance+revenue
      userResult.lastmeme = Date.now()
      await userResult.save()
      message.channel.send(s)
    }
    if (collected.first().content.toLowerCase() == 'e') {
      userResult.balance = userResult.balance+revenue
      userResult.lastmeme = Date.now()
      await userResult.save()
      message.channel.send(s)
    }
    if (collected.first().content.toLowerCase() == 'r') {
      userResult.balance = userResult.balance+revenue 
      userResult.lastmeme = Date.now()
      await userResult.save()
      message.channel.send(s)
    }
    if (collected.first().content.toLowerCase() == 'd') {
      userResult.balance = userResult.balance+revenue 
      userResult.lastmeme = Date.now()
      await userResult.save()
      message.channel.send(s)
    }
  }).catch(() => {
    return; 
    //message.reply(`Wedding cancelled as no answers were given!`)
  })
        }
    } 