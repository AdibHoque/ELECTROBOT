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
        const use = message.mentions.users.first();
          if(!use)
              return message.reply('Mention someone to cuddle!');
          else {
          superagent.get('https://nekos.life/api/v2/img/cuddle')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " cuddles "+use.username+"! 😏")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }}
    }    