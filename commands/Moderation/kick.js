const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<:ElectroCross:737678614681878580>"

module.exports = {
    name: "kick",
    category: "Moderation",
    description:"Kick outs mentioned user!",
    aliases: ["kickout"],
    usage: "ban <@user> <reason>",
    run: async(client, message, args) => {

        // No args
        if (!args[0]) {
            return message.reply(fail+" Please provide a person to kick.").then(m => m.delete(5000));
        }

        // No reason
      //  if (!args[1]) {
        //    return message.reply(fail+" Please provide a reason to kick.").then(m => m.delete(5000));
      //  }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(new MessageEmbed().setDescription(fail+" You do not have permission the `KICK_MEMBERS`.").setColor("#ffbf00")).then(m => m.delete(5000));

        }
        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(fail+" I do not have permissions the `KICK_MEMBERS`.").then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply(fail+" `INVALID_USER`.").then(m => m.delete(5000));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply(fail+" You can't kick yourself.").then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!toBan.kickable) {
            return message.reply(fail+" I can't kick that person due to role hierarchy.").then(m => m.delete(5000));
        }
        // ban!! 
      if (message.deletable) message.delete();
      const reas = args.slice(1).join(" ")
      const reason = args[1] ? reas : "No reason provided"
      toBan.send(`You're were kicked out from ${message.guild.name}, reason: \`${reason}\`.`)
      toBan.kick(reason) 
      const embed = new MessageEmbed()
      .setDescription(`${check} ${toBan.user.username}#${toBan.user.discriminator} was kicked out, ${reason}`)
      .setColor("#ffbf00")
      message.channel.send(embed)
        }
    } 