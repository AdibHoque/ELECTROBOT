const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const db = require("quick.db")

module.exports = {
    name: "snipe",
    category: "General",
    description: "Get the last deleted message!",
    aliases: [],
    usage: "snipe",
    run: async(client, message, args) => {
    const msg = message
    const channel = message.mentions.channels.first() || message.channel
    const s = await db.fetch(`snipe${channel.id}.mc`);
    if(!s) return message.channel.send("Nothing to snipe here!");
    const a = await db.fetch(`snipe${channel.id}.sa`);
    const t = await db.fetch(`snipe${channel.id}.time`);
    const av = await db.fetch(`snipe${channel.id}.saav`);
    const embed = new RichEmbed()
      .setAuthor(`${a}`, `${av}`)
      .setDescription(`${s}`)
      .setFooter(`${t}`)
      .setColor(`#ffbf00`);
    msg.channel.send(embed); 
  
}
}