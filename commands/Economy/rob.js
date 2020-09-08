const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")
const ms = require('parse-ms') 

module.exports = {
    name: "rob",
    category: "Economy",
    description: "Rob someone!",
    aliases: ["steal"],
    usage: "rob <@user>",
    run: async(client, message, args, prefix) => {
        const msg = message 
	const memberToRob = message.mentions.users.first() || client.users.cache.get(args[0]);
  if(!memberToRob) return message.channel.send(`You need to mention someone to rob!`);
      const robtimeout = 1800000*2;
      const robbedtimeout = 1800000
  const userResult = await u.findOne({name: "users", preid: message.author.id})
if(!userResult) {
message.channel.send("You don't have a economy account yet, get started by doing \`${prefix}daily\`.")
}
  const user2Result = await u.findOne({name: "users", preid: memberToRob.id})
if(!user2Result) {
return message.channel.send("They don't have a economy account yet, tell them to get started by doing \`${prefix}daily\`.")
}
if (userResult.lastrob !== null && robtimeout - (Date.now() - userResult.lastrob) > 0) {
  const time = ms(robtimeout - (Date.now() - userResult.lastrob));
		 return message.channel.send(`⏱ You'll be able to use this command again in **${time.hours}H ${time.minutes}M ${time.seconds}S**.`)
}
if (user2Result.lastrobbed !== null && robbedtimeout - (Date.now() - user2Result.lastrobbed) > 0) {
  const time = ms(robbedtimeout - (Date.now() - userResult.lastrobbed));
		return message.channel.send(`This user was already robbed recently.\n⏱ You'll be able to rob this user in **${time.hours}H ${time.minutes}M ${time.seconds}S**.`)
}
const u1b = userResult.balance ? userResult.balance : 0;
const u2b = user2Result.balance ? user2Result.balance : 0;
if(u1b < 500) return message.channel.send(`You need to have atleast $500 to be able to rob!`);
if(u2b < 500) return message.channel.send(`The victim must have atleast $500 to get robbed!`);
  const amountToAdd = Math.floor(Math.random() * (user2Result.balance/100)*30)
  
	if (memberToRob.bot) return message.channel.send('You can\'t rob a bot account!');
	
	const senderINFO = await u.findOne({name: "users", preid: message.author.id})
	const senderCredits = senderINFO.balance ? senderINFO.balance : 0;

	if (memberToRob.id == message.author.id) return message.channel.send('You can\'t rob yourself!');

	await require('./../../Mongodb/user.js').updateOne({ preid: message.author.id }, { $inc: { balance: amountToAdd }, lastrob:Date.now() });
	await require('./../../Mongodb/user.js').updateOne({ preid: memberToRob.id }, { $inc: { balance: -amountToAdd }, lastrobbed:Date.now() });
    message.channel.send(`🤑 You robbed $${amountToAdd} from ${memberToRob.tag}!`)
        }
    } 