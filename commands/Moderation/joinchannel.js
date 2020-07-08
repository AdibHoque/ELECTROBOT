const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const db = require('quick.db')

module.exports = {
    name: "joinchannel",
    category: "Moderation",
    description: "Set the join message channel!",
    aliases: ["join-message-channel", "setwelcomer", "setjc"],
    usage: "joinchannel <#channel>",
    run: async(client, message, args) => {
        let permission = message.member.hasPermission("ADMINISTRATOR");

    if (!permission)
      return message.channel.send(
        "You are missing the permission `ADMINISTRATOR`"
      );

    let cArgs = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!cArgs)
      return message.channel.send(
        "You must specify a valid id for the welcome channel!"
      );

    try {
      message.guild.channels.cache.get(cArgs.id).send("Welcome channel set!");

      await db.set(`jc${message.channel.guild.id}`, cArgs.id);

      message.channel.send(
        "You have successfully set the welcome channel to <#" + cArgs.id + ">"
      );
      return;
    } catch (e) {
      return message.channel.send(
        "Error: missing permissions or channel doesn't exist"
      );
    }
        }
    } 