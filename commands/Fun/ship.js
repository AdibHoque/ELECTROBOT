const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "ship",
    category: "Fun",
    description: "Ship two people!",
    aliases:["love", "lovemeter"],
    usage: "ship <@user> <@user2>",
    run: async(client, message, args) => {
      function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
      }
        const msg = message 
        const u1 = getUserFromMention(args[1]);
        const u2 = getUserFromMention(args[0]);
        if(u1.id === u2.id) {
          message.channel.send("Please mention two different people")
          return
        }
      const av1 = u1.avatarURL({format: "png", dynamic: false, size: 256})
      const av2 = u2.avatarURL({format: "png", dynamic: false, size: 256})
      const {get} = require("request-promise-native");
let options = {
url: `https://nekobot.xyz/api/imagegen?type=ship&user1=${av1}&user2=${av2}`,
json: true
}
get(options).then(async body => {
//message.channel.send(body.message))
        const score = Math.round(Math.random() * 100)
        const filled_progbar = Math.round(score / 100 * 10)
        const counter_ = '■' .repeat(filled_progbar) + '□' .repeat((10 - filled_progbar))
        
        const embed = new MessageEmbed()
        .setAuthor(`${u1.username} X ${u2.username}`)
        .setDescription(`${score}% [${counter_}](https://discord.gg/pokehunt) ❤️`)
        .setImage(body.message)
        .setColor("#ffbf00")
        message.channel.send(embed)
})}}