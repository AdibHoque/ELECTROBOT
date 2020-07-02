const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const superagent = require("snekfetch")

module.exports = {
    name: "hug",
    category: "Fun",
    description: "Hug someone!",
    aliases: [],
    usage: "hug <@user>",
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
          if(!user)
              return message.reply('Mention someone to hug!');

          superagent.get('https://nekos.life/api/v2/img/hug')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " gives "+user.username+" a big hug! ❤")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }
    }   