const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<:ElectroCross:737678614681878580>"

module.exports = {
    name: "dm",
    category: "Moderation",
    description: "Make the bot repeat your text to someones dm!",
    aliases: ["dmecho", "dmrepeat"],
    usage: "dm <@user> <text>",
    run: async(client, message, args) => {
        const msg = message 
        if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(fail+" **| PLEASE SPECIFY SOMETHING TO SEND!**").setColor("#ffbf00"));
        if(!msg.member.hasPermission("ADMINISTRATOR")) {
           message.channel.send(new MessageEmbed().setDescription(fail+" | YOU NEED THE `ADMINISTRATOR` PERMISSION TO USE THIS COMMAND!").setColor("#ffbf00"))
           }
      const tosend = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.find(m => m.user.tag === args[0]);
      tosend.send(args.slice(1).join(" ")+`\n-Sent from ${message.guild.name} by ${message.author.tag}(Admin)`,new MessageEmbed().setDescription(`Want this bot in your server? [Click here]( https://discord.com/api/oauth2/authorize?client_id=629323586930212884&permissions=2146827775&scope=bot)`))
      message.channel.send(check+` **| ${tosend.user.tag} RECEIVED YOUR DM!**`)
      
        }
    } 