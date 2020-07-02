const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const superagent = require("snekfetch")

module.exports = {
    name: "slap",
    category: "Fun",
    description: "Slap someone!",
    aliases: [],
    usage: "slap",
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
          if(!user)
              return message.reply('Mention someone to slap!');

          superagent.get('https://nekos.life/api/v2/img/slap')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " slaps "+user. username+"!! Deserves it! 😡")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }
    }  