const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const test = require("decode-encode-binary")

module.exports = {
    name: "encode",
    category: "General",
    description: "Encodes a string to binary code!",
    aliases: [],
    usage: "encode <string>",
    run: async(client, message, args) => {
        const d = test.encode(args.join(" "))
        message.channel.send(d)
        }
    } 