const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "avatar",
    category: "General",
    description: "Check Your Avatar!",
    aliases: ["av", ""],
    Usage: "avatar [@user]",
    run: async(client, message, args) => {
      const user = message.mentions.users.first() || message.author
    if(!user) {
        return message.reply('Please mention the user who you want the avatar from.');
    }
    if(!user.avatarURL) {
        return message.channel.send(`That user does not have an avatar`)
    }
    const embed = new MessageEmbed()
    .setTitle(`${user.username}${user.discriminator}'s Avatar`)
    .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor(`#ffbf00`)
    message.channel.send(embed)
        
        }
    }  