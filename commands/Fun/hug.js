const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const {get} = require("request-promise-native");

let options = {
url: "https://nekos.life/api/v2/img/hug",
json: true
}



module.exports = {
    name: "hug",
    category: "Fun",
    description: "Hug someone!",
    aliases: [],
    usage: "hug <@user>",
    run: async(client, message, args) => {
        const use = message.mentions.users.first();
          if(!use)
              return message.channel.send('Mention someone to hug!');
          get(options).then(async response => {
           // const response = res.json()
           // console.log(res)
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " gives "+use.username+" a big hug! ❤")
            .setImage(response.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          })}
        }