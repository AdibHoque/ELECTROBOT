const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const db = require("quick.db")

module.exports = {
    name: "editsnipe",
    category: "General",
    description: "Get the last edited message!",
    aliases: [],
    usage: "esnipe",
    run: async(client, message, args) => {
    const msg = message
    const s = await db.fetch(`editsnipe${msg.channel.id}.mc`);
    if(!s) return message.channel.send("Nothing to snipe here!");
    const a = await db.fetch(`editsnipe${msg.channel.id}.sa`);
    const t = await db.fetch(`editsnipe${msg.channel.id}.time`);
    const av = await db.fetch(`editsnipe${msg.channel.id}.saav`);
    const af = await db.fetch(`editsnipe${msg.channel.id}.after`)
    const embed = new RichEmbed()
      .setAuthor(`${a}`, `${av}`)
      .addField(`Before Edit`,`${s}`)
      .addField(`After Edit`, `${af}`)
      .setFooter(`${t}`)
      .setColor(`#ffbf00`);
    msg.channel.send(embed); 
  
}
        }