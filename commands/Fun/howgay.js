const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);


module.exports = {
    name: "howgay",
    category: "Fun",
    description: "Check gayrate of someone!",
    aliases: ["gayrate", "g8"],
    usage: "howgay [@user]",
    run: async(client, message, args) => {
        const msg = message 
        const m = message.mentions.members.first() || message.member
        const score = Math.round(Math.random() * 100)
        const filled_progbar = Math.round(score / 100 * 10)
        const counter_ = '■' .repeat(filled_progbar) + '□' .repeat((10 - filled_progbar))
        ameApi
      .generate("gay", {
        url: m.user.avatarURL({size: 1024, format: "png", dynamic: false})
      })
      .then(image => {
        /*msg.channel.send({
          files: [
            {
              attachment: image,
              name: "ewwgae.png"
            }
          ]
        });*/
        const embed = new MessageEmbed()
        .setAuthor(`${m.user.username}`,`${m.user.avatarURL({format: "png", dynamic: true, size: 256})}`)
        .setTitle(`Gayrate`)
        .setDescription(`${score}% [${counter_}](https://discord.gg/pokehunt)`)
        .setColor("#ffbf00")
        .attachFiles([image])
        .setImage("attachment//image.png")
        message.channel.send(embed)
        }) }}