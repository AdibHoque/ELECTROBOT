const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const superagent = require("snekfetch")

module.exports = {
    name: "spank",
    category: "Fun",
    description: "Spank someone!",
    aliases: [],
    usage: "Spank <@user>",
    run: async(client, message, args, nsfwembed) => {
      if(!message.channel.nsfw) return message.channel.send(nsfwembed);
        const user = message.mentions.users.first();
          if(!user)
              return message.reply('Mention someone to Spank!');

          superagent.get('https://nekos.life/api/v2/img/spank')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " spanks "+user.username+"! 🍑")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }
    }    