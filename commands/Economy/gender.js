const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "gender",
    category: "Economy",
    description: "Set Your Gender!",
    aliases: ["setgender"],
    usage: "gender",
    run: async(client, message, args) => {
        const msg = message 
        const userResult = await u.findOne({name: "users", preid: message.author.id})
        message.channel.send(`Which gender are you male, female, both or none? (Depending on the genital/private part you have) Type the answer in 30 seconds!`);
	message.channel.awaitMessages(m => m.author.id == message.author.id, {
		max: 1,
		time: 30000,
		errors: ['time'],
	}).then(async collected => {
		if (!collected.first()) return;
		if (collected.first().content.toLowerCase() == 'male') {
      userResult.gender = "♂️Male"
      await userResult.save()
      message.channel.send("Gender set to Male! 💪");
    }
    if (collected.first().content.toLowerCase() == 'female') {
      userResult.gender = "♀️Female"
      await userResult.save()
      message.channel.send("Gender set to Female! 💋");
    }
    if (collected.first().content.toLowerCase() == 'both') {
      userResult.gender = "Both"
      userResult.save()
      message.channel.send("Gender set to Both! 👥");
    }
    if (collected.first().content.toLowerCase() == 'none') {
      userResult.gender = "None"
      userResult.save()
      message.channel.send("Gender set to None!");
    }
  }).catch(() => {
    return; 
    //message.reply(`Wedding cancelled as no answers were given!`)
  })
        }
    } 