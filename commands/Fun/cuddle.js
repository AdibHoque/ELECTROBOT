const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const superagent = require("snekfetch")

module.exports = {
    name: "cuddle",
    category: "Fun",
    description: "Cuddle with someone!",
    aliases: [],
    usage: "cuddle <@user>",
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
          if(!user)
              return message.reply('Mention someone to cuddle!');

          superagent.get('https://nekos.life/api/v2/img/cuddle')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " cuddles "+user.username+"! 😏")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }
    }    