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
    name: "pokehunt",
    category: "Fun",
    description: "Generate pokehunt personalized avatar!",
    aliases: ["phav", "pokéhunt"],
    usage: "pokehunt [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(mention.user.avatarURL({size: 1024, format: "png", dynamic: false}));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/730825296319873064/phav.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "pokehuntav.png"
        }
      ]
    });
        }
    } 