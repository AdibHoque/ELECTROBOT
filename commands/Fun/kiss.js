const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const superagent = require("snekfetch")

module.exports = {
    name: "kiss",
    category: "Fun",
    description: "Kiss someone!",
    aliases: [],
    usage: "kiss <@user>",
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
          if(!user)
              return message.reply('Mention someone to kiss!');

          superagent.get('https://nekos.life/api/v2/img/kiss')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " kisses "+user.username+" lips! ❤")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }
    }   