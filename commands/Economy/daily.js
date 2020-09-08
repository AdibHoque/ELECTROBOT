const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "daily",
    category: "Economy",
    description: "Get your dailies",
    aliases: [],
    usage: "daily",
    run: async(client, message, args) => {
      const userResult = await u.findOne({name: "users", preid: message.author.id})
        const msg = message 
	const timeout = 8.28e7;
	const mamount = 350;
	const samount = 200;
	const amount = Math.floor(Math.random() * mamount + samount);
if(!userResult) {
  let duck = new u({
            _id: new mongoose.Types.ObjectId(),
            name: "users",
            preid: message.author.id,
            lastdaily: Date.now(),
            balance: amount+69
          })
  duck.save().catch(console.error);
  message.channel.send(`:white_check_mark: You got **$${amount}** daily.\nFirst time claiming daily you got **$69** as bonus, have fun! (Remember to come back & claim tomorrow!)`)
}
	const daily = userResult.lastdaily;
	if (daily !== null && timeout - (Date.now() - daily) > 0) {
		const time = ms(timeout - (Date.now() - daily));
		return message.channel.send(`You have already claimed your daily today.\n⏱ You'll be able to use this command again in **${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds**!`);
	} 
  else {
		await require('./../../Mongodb/user.js').updateOne({ preid: message.author.id }, { $inc: { balance: amount }, lastdaily: Date.now() });
    await require('./../../Mongodb/user.js').updateOne({preid: message.author.id }, { $inc: {dailystreak:1} })
		return message.channel.send(`:white_check_mark: You got **$${amount}** daily.`);
	}
  const g = timeout - (Date.now() - daily) 
  if(g < timeout) {
    await require('./../../Mongodb/user.js').updateOne({preid: message.author.id},{dailystreak: 0});
  }
}
}