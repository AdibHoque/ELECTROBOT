const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<:ElectroCross:737678614681878580>"

module.exports = {
    name: "ban",
    category: "Moderation",
    description:"Delivers the ultimate ban hammer!",
    aliases: ["banhammer"],
    usage: "ban <@user> <reason>",
    run: async(client, message, args) => {

        // No args
        if (!args[0]) {
            return message.reply(fail+" Please provide a person to ban.").then(m => m.delete(5000));
        }

        // No reason
        //if (!args[1]) {
           // return message.reply(fail+" Please provide a reason to ban.").then(m => m.delete(5000));
       // }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply(fail+" You do not have permission the `BAN_MEMBERS`.").then(m => m.delete(5000));

        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply(fail+" I do not have permissions the `BAN_MEMBERS`.").then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply(fail+" INVALID USER.").then(m => m.delete(5000));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply(fail+" You can't ban yourself.").then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply(fail+" I can't ban that person due to role hierarchy.").then(m => m.delete(5000));
        }
        // ban!! 
      if (message.deletable) message.delete();
      const reason = args[0] ? args.slice(1).join(" ") : "No reason provided"
      toBan.send(`You were banned from ${message.guild.name}, Reason: \`${reason}\`.`)
      toBan.ban(reason) 
      const embed = new MessageEmbed()
      .setDescription(`${check} ${toBan.user.username}#${toBan.user.discriminator} was banned, ${reason}`)
      .setColor("#ffbf00")
      message.channel.send(embed)
        }
    } 