const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "marry",
    category: "Economy",
    description: "Marry someone!",
    aliases: ["wed", "propose"],
    usage: "marry <@user>",
    run: async(client, message, args, prefix) => {
        const msg = message 
        const tomarry = message.mentions.users.first() || client.users.cache.get(args[0])
        if(message.author.id == tomarry.id) return message.channel.send("You can't marry yourself!")
        const userResult = await u.findOne({name: "users", preid: message.author.id})
        const userResult2 = await u.findOne({name: "users", preid: tomarry.id})
        if(!userResult.gender) return message.channel.send(`<@${message.author.id}> you haven't set your gender yet, please type \`${prefix}gender\` to get started!`)
        if(userResult.marriedto) return message.channel.send(`<@${message.author.id}> you're already married! You can dismiss your current relationship by \`${prefix}divorce\` & marry again!`);
        if(!userResult2.gender) return message.channel.send(`${tomarry.username} haven't specified their gender yet! They needs to type \`${prefix}gender\` to get started!`)
        if(userResult2.marriedto) return message.channel.send(`**${tomarry.username}** is already married!`)
        if(userResult.gender.includes("Male") && userResult2.gender.includes("Male")) return message.channel.send(`Sorry but you can't marry another male! 🏳️‍🌈⃠`)
        if(userResult.gender.includes("Female") && userResult2.gender.includes("Female")) return message.channel.send(`Sorry but you can't marry another female! 🏳️‍🌈⃠`);
      message.channel.send(`<@${tomarry.id}>, You have been proposed to marry by ${message.author.username}! Type in \`Yes\` or \`No\` in 30 seconds!`);
	message.channel.awaitMessages(m => m.author.id == tomarry.id, {
		max: 1,
		time: 30000,
		errors: ['time'],
	}).then(async collected => {
		if (!collected.first()) return;
		if (collected.first().content.toLowerCase() == 'yes') {
      userResult.marriedto = tomarry.id
      userResult.marriedtoname = tomarry.tag
      await userResult.save()
      userResult2.marriedto = message.author.id
      userResult2.marriedtoname = message.author.tag
      await userResult2.save()
      message.channel.send("Congratulations to both of you!\nMay the love and happiness you feel today shine through the years & you don't require to use the divorce command!")
      
    }
    if (collected.first().content.toLowerCase() == 'no') {
      message.channel.send(`<@${message.author.id}> You're rejected, better luck next time!`)
    }
  }).catch(() => {
    return; 
    //message.reply(`Wedding cancelled as no answers were given!`)
  })
        }
    } 
