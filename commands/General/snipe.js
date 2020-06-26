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
    const s = await db.fetch(`snipe${msg.channel.id}.mc`);
    const a = await db.fetch(`snipe${msg.channel.id}.sa`);
    const t = await db.fetch(`snipe${msg.channel.id}.time`);
    const av = await db.fetch(`snipe${msg.channel.id}.saav`);
    const embed = new RichEmbed()
      .setAuthor(`${a}`, `${av}`)
      .setDescription(`${s}`)
      .setFooter(`${t}`)
      .setColor(`#ffbf00`);
    msg.channel.send(embed); 
  
}
        }