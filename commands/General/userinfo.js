const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "userinfo",
    category: "General",
    description: "Get info about a user!",
    aliases: ["whois"],
    usage: "userinfo",
    run: async(client, message, args) => {
        const msg = message
        const user = message.mentions.members.first() || message.author
        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setThumbnail(user.avatarURL())
            .setAuthor(`${user.tag}`)
            .addField("ID ", user.id, true)
            .addField("Bot User", user.bot ? "True": "False", true)
            .addField("Account Created", user.createdAt.toLocaleString(), true)
            .setColor(`#ffbf00`)
             if(!message.author===message.guild.owner) {
               embed.addField("Joined At", user.joinedAt.toLocaleString(), true)
             }
        message.channel.send(embed)
        }
    }  