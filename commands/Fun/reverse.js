const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const reverse = require("reverse-text");

module.exports = {
    name: "reverse",
    category: "Fun",
    description: "Reverse a text!",
    aliases: [],
    usage: "reverse <your text>",
    run: async(client, message, args) => {
        const msg = message 
        const text = await reverse(args.join(" "));
    const embed = new MessageEmbed()
      .setTitle(`Reversed Text`)
      .setDescription(text)
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
        }
    } 