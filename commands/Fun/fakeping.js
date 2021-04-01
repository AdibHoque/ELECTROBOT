const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const Canvas = require("canvas");

module.exports = {
    name: "fakeping",
    category: "Fun",
    description: "Generate a fake ping image!",
    aliases: [],
    usage: "whatyouseevswhatshesees [@user]",
    run: async(client, message, args) => {
       /* const msg = message 
        let img = message.author.avatarURL({})
    const canvas = Canvas.createCanvas(1080, 720);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/656517276832366595/823498077339385866/WysVSwss.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(mention.user.avatarURL({size: 1024, format: "png", dynamic: false}));
    ctx.drawImage(avatar, 359, 60, 339, 420);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "MadeWithElectro.png"
        }
      ]
    });*/
        }
    } 
