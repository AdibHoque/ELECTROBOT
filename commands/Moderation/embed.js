const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "embed",
    category: "Moderation",
    description: "Make a embed with json format!",
    aliases: [],
    usage: "embed <{title: \"your title\", description: \"your description\"}>",
    run: async(client, message, args) => {
        const msg = message 
        const res = JSON.parse(args.join(" "))
        const embed = new MessageEmbed()
        .setTitle(res.title)
        .setDescription(res.description)
        message.channel.send(embed)
        }
    } 
