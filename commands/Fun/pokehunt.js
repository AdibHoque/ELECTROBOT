const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const Canvas = require("canvas");

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};

module.exports = {
    name: "whatyouseevswhatshesees",
    category: "Fun",
    description: "Make your own WhatYouSeeVsWhatSheSees Meme!",
    aliases: ["wysvswss"],
    usage: "whatyouseevswhatshesees [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(720, 480);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/656517276832366595/823498077339385866/WysVSwss.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(mention.user.avatarURL({size: 512, format: "png", dynamic: false}));
    ctx.drawImage(avatar, 359, 60, 339, 420);
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
