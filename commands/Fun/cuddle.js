const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const {get} = require("request-promise-native");

let options = {
url: "https://nekos.life/api/v2/img/cuddle",
json: true
}

module.exports = {
    name: "cuddle",
    category: "Fun",
    description: "Cuddle with someone!",
    aliases: [],
    usage: "cuddle <@user>",
    run: async(client, message, args) => {
        const use = message.mentions.users.first();
          if(!use) return message.reply('Mention someone to cuddle!');
           const response = await get(options)
      const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " cuddles "+use.username+"! 😏")
            .setImage(response.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
        }
    }    