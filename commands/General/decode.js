const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const test = require("decode-encode-binary")

module.exports = {
    name: "decode",
    category: "General",
    description: "Decodes a binary code!",
    aliases: [],
    usage: "decode <binary code>",
    run: async(client, message, args) => {
        const d = test.decode(args.join(" "))
        const embed = new MessageEmbed()
        .setTitle("Decoded")
        .setDescription(d)
        message.channel.send(embed)
        }
    } 