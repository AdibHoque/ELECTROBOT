const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "beg",
    category: "Economy",
    description: "Get some donations",
    aliases: [],
    usage: "beg",
    run: async(client, message, args, prefix) => {
      const donors = ["Adib","Mark Zuckerberg","Adib","Warren Buffett","Adib","Bill Gates","Adib","Jeff Bezos","Adib","Mr. Beast","Adib","Elon Musk","Mukesh Ambani","Mansa Musa","John D. Rockefeller","Adib","Jacob Fugger","SSSniperwolf","Mia Khalifa","Sunny Leone","Dani Daniels","Eliza Ibarra","Lana Rhoades","Leah Gotti","Drake","Justin Bieber","Selena Gomez","Charlie Puth","Charlie Chaplin","Kyle Jenner","Kendall Jenner","Caitlyn Jenner","Kim Kardashian","Kourtney Kardashian","Kayne West","Ariana Grande","Sia","Wiz Khalifa"]
      var donor = donors[Math.round(Math.random() * (donors.length - 1))];
      const userResult = await u.findOne({name: "users", preid: message.author.id})
        const msg = message 
	const timeout = 1800000;
	const mamount = 100;
	const samount = 25;
	const amount = Math.floor(Math.random() * mamount + samount);
if(!userResult) {
 return message.channel.send(`You don't have a economy account yet, type \`${prefix}daily\` to get started!`)
}
	const daily = userResult.lastbeg;
	if (daily !== null && timeout - (Date.now() - daily) > 0) {
		const time = ms(timeout - (Date.now() - daily));
		return message.channel.send(`You have already begged this hour and again trying to beg? Shame on you.\n⏱ You'll be able to use this command again in **${time.minutes} minutes and ${time.seconds} seconds**!`);
	} else {
		await require('./../../Mongodb/user.js').updateOne({ preid: message.author.id }, { $inc: { balance: amount }, lastbeg: Date.now() });
		return message.channel.send(`:white_check_mark: **${donor}** donated you **$${amount}**!`);
	}
}
}