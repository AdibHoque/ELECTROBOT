const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "divorce",
    category: "Economy",
    description: "Divorce!",
    aliases: [],
    usage: "divorce",
    run: async(client, message, args, prefix) => {
        const msg = message 
        const userResult = await u.findOne({name: "users", preid: message.author.id})
        if(!userResult) return message.channel.send(`You don't have a account yet, please type \`${prefix}\`daily to get started!`)
        if(!userResult.marriedto) return message.channel.send(`You're not married yet!`);
      //  if(!userResult2.gender) return message.channel.send(`${tomarry.username} haven't specified their gender yet! They needs to type \`${prefix}gender\` to get started!`)
       // if(userResult2.marriedto) return message.channel.send(`**${tomarry.username}** is already married!`)
       // if(userResult.gender.includes("Male") && userResult2.gender.includes("Male")) return message.channel.send(`Sorry but you can't marry another male! 🏳️‍🌈⃠`)
       // if(userResult.gender.includes("Female") && userResult2.gender.includes("Female")) return message.channel.send(`Sorry but you can't marry another female! 🏳️‍🌈⃠`);
      message.channel.send(`Are you sure you want to divorce your current partner? Type in \`Confirm\` or \`Cancel\` in 30 seconds!`);
	message.channel.awaitMessages(m => m.author.id == message.author.id, {
		max: 1,
		time: 30000,
		errors: ['time'],
	}).then(async collected => {
		if (!collected.first()) return;
		if (collected.first().content.toLowerCase() == 'confirm') {
      userResult.marriedto = null
      userResult.marriedtoname = null
      await userResult.save()
      message.channel.send("You're now divorced with your ex partner!")
      
    }
    if (collected.first().content.toLowerCase() == 'cancel') {
      message.channel.send(`Divorce cancelled!`)
    }
  }).catch(() => {
    return; 
    //message.reply(`Wedding cancelled as no answers were given!`)
  })
        }
    } 