const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

module.exports = {
    name: "menro",
    category: "Moderation",
    description:"Mentions a unmentionable/mentionable role & makes it unmentionable again!",
    aliases: ["mentionrole"],
    usage: "menro <role name/id>",
    run: async(client, message, args) => {

        // No args
        if (!args[0]) {
            return message.reply(fail+" Please provide a role name or ID.").then(m => m.delete(5000));
        }
 

        // No author permissions
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply(fail+" You do not have the permission to `MANAGE_ROLES`.").then(m => m.delete(5000));

        }
        // No bot permissions
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.reply(fail+" I do not have permissions the `MANAGER_ROLES`.").then(m => m.delete(5000));
        }

        const toBan = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args.join(" ")) || message.mentions.roles.first()

        // No member found
        if (!toBan) {
            return message.reply(fail+" INVALID ROLE.").then(m => m.delete(5000));
        }

        // Can't ban urself
        //if (toBan.id === message.author.id) {
       //     return message.reply(fail+" You can't give roles to yourself.").then(m => m.delete(5000));
       // }

        // Check if the user's banable
       // if (!toBan.bannable) {
        //    return message.reply(fail+" I can't edit that role due to role hierarchy.").then(m => m.delete(5000));
      //  }
        // ban!! 
     if (message.deletable) message.delete({timeout: 5000})
      
      if (toBan.mentionable) {
        message.channel.send(`<@&${toBan.id}>`)
        toBan.edit({mentionable: "false"}) 
        return; 
      }
      if (!toBan.mentionable) {
        toBan.edit({mentionable: "true"})
      message.channel.send(`<@&${toBan.id}>`)
        toBan.edit({mentionable: "false"})
        return; 
        }
    }}  