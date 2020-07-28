const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const {get} = require("request-promise-native");
let options = {
url: "https://nekos.life/api/v2/img/slap",
json: true
}

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
          const response = await get(options) 
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " slaps "+use. username+"!! Deserves it! 😡")
            .setImage(response.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
        }
    }  