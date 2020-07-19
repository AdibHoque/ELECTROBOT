const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const fetch = require("node-fetch");

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
          else {
          const res = await fetch(encodeURI('https://nekos.life/api/v2/img/hug'));
            const response = res.json()
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " gives "+use.username+" a big hug! ❤")
            .setImage(response.body.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
          }
        }
    }   