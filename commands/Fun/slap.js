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
        const use = message.mentions.users.first();
          if(!use)
              return message.reply('Mention someone to slap!');
          else {
          superagent.get('https://nekos.life/api/v2/img/slap')
              .end((err, response) => {
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " slaps "+use. username+"!! Deserves it! 😡")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }) 
        }}
    }  