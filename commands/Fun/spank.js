const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const {get} = require("request-promise-native");
let options = {
url: "https://nekos.life/api/v2/img/spank",
json: true
}

module.exports = {
    name: "spank",
    category: "Fun",
    description: "Spank someone!",
    aliases: [],
    usage: "Spank <@user>",
    run: async(client, message, args) => {
      const nsfwembed = new MessageEmbed().setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`).setColor(`#ff0000`);
      if(!message.channel.nsfw) return message.channel.send(nsfwembed);
        const user = message.mentions.users.first();
          if(!user)
              return message.reply('Mention someone to Spank!');
      const response = await get(options) 
            const lewdembed = new MessageEmbed()
            .setTitle(message.author.username + " spanks "+user.username+"! 🍑")
            .setImage(response.url)
            .setColor(`#ffbf00`)
        message.channel.send(lewdembed);
        }
    }    