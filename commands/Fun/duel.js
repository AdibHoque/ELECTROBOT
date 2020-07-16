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
    name: "duel",
    category: "Fun",
    description: "Pokehunt image manipulation!",
    aliases: [],
    usage: "duel <pokeid> <pokeid>",
    run: async(client, message, args) => {
        const msg = message 
        //let mention = message.mentions.members.first() || message.member;
      const link1 = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+args[0]+".png"
      const link2 = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+args[1]+".png"
    const canvas = Canvas.createCanvas(1200, 600);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/656517276832366595/732992299579211946/duel.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const poke1 = await Canvas.loadImage(link1);
    ctx.drawImage(poke1, 121, 80, 348, 320);
    const poke2 = await Canvas.loadImage(link2);
    ctx.drawImage(poke2, 710, 83, 348, 320)
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "pokehuntduel.png"
        }
      ]
    });
        }
    } 
