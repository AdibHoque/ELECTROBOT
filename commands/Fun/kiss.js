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
        const use = message.mentions.users.first();
          if(!use)
              return message.reply('Mention someone to kiss!');
          else {
          superagent.get('https://nekos.life/api/v2/img/kiss')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " kisses "+use.username+" lips! ❤")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }}
    }   