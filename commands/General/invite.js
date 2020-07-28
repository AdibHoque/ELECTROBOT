const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

module.exports = {
    name: "invite",
    category: "General",
    description: "ELECTRO's Invite URL",
    aliases: ["support", "guild","auth","server"],
    usage: "invite",
    run: async(client, message, args) => {
        const msg = message 
        const embed = new MessageEmbed()
        .setAuthor("ELECTRO's Invite URL",client.user.avatarURL({format: "png"}))
        .setDescription("Here are some useful links! If you have any questions about the bot, feel free to join the support guild and ask! Thank you for using the bot! 💛 from the bot developer `ADIB HOQUE#6969`")
        .addField("Invite URL","https://discord.com/api/oauth2/authorize?client_id=629323586930212884&permissions=2146827775&scope=bot")
        .addField("Support Server","[https://discord.gg/electro](https://discord.gg/dAggRh9)")
        .setColor("#ffbf00")
        .setFooter("We hope you have fun with the bot!",client.user.avatarURL({format: "png"}))
        message.channel.send(embed)
        }
    } 