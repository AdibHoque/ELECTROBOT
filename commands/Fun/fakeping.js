const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const Canvas = require("canvas");

module.exports = {
    name: "fakepingimage",
    category: "Fun",
    description: "Generate a fake ping image!",
    aliases: [],
    usage: "whatyouseevswhatshesees [@user]",
    run: async(client, message, args) => {
        const msg = message 
        const member = message.mentions.members.first() || message.member;
        let img = member.user.avatarURL({size: 1024, format: "png", dynamic: false})
        if(message.content.toLowerCase().includes('server')) img = message.guild.iconURL({ format: 'png', dynamic: false, size: 1024 })
    const canvas = Canvas.createCanvas(515, 515);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(img);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(mention.user.avatarURL("https://cdn.discordapp.com/attachments/656517276832366595/827162267668971570/FakePing.png")
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "MadeWithElectro.png"
        }
      ]
    });
        }
    } 
