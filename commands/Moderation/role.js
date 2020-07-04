const {MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

module.exports = {
    name: "role",
    category: "Moderation",
    description:"Adds or removes role from a user!",
    aliases: ["giverole","removerole"],
    usage: "role <@user/username/userid> <role name/id>",
    run: async(client, message, args) => {

        // No args
        if (!args[1]) {
            return message.reply(fail+" Please provide a role name or ID.").then(m => m.delete({timeout:5000}));
        }
 

        // No author permissions
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply(fail+" You do not have the permission to `MANAGE_ROLES`.").then(m => m.delete({timeout: 5000}));

        }
        // No bot permissions
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.reply(fail+" I do not have permissions the `MANAGER_ROLES`.").then(m => m.delete({timeout: 5000}));
        }

        const therole = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(role => role.name === args[1]) || message.mentions.roles.first()
        const theuser = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(role => role.name === args[0]) || message.mentions.users.first()

        // No member found
        if (!therole) {
            return message.reply(fail+" INVALID ROLE.").then(m => m.delete({timeout:5000}));
        }

        // Can't give urself
        if (theuser.id === message.author.id) {
           return message.reply(fail+" You can't give roles to yourself.").then(m => m.delete({timeout:5000}));
        }
      
      if(theuser.roles.cache.has(therole.id)) {
         theuser.roles.remove(therole.id)
        message.channel.send(check+` Changed roles for ${theuser.tag}, -${therole.name}`)
        return; 
         }
      if(!theuser.roles.cache.has(therole.id)) {
        theuser.roles.add(therole.id)
        message.channel.send(check+` Changed roles for ${theuser.tag}, +${therole.name}`)
        return;
      }
}}