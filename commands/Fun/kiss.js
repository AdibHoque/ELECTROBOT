const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const {get} = require("request-promise-native");
let options = {
url: "https://nekos.life/api/v2/img/kiss",
json: true
}

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
          const response = await get(options) 
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " kisses "+use.username+" lips! ❤")
            .setImage(response.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
        }}