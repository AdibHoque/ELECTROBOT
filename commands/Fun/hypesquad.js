const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);

module.exports = {
    name: "hypesquad",
    category: "Fun",
    description: "Generate a hypesquad badge for yourself!",
    aliases: ["hs"],
    usage: "hypesquad <brilliance/bravey/balance>",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    if (args[0] === "brilliance") {
      ameApi
      .generate("discordhouse", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false}),
        house: "brilliance"
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "hypesquad-badge.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
      return; 
    }
    if (args[0] === "bravery") {
      ameApi
      .generate("discordhouse", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false}),
        house: "bravery"
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "hypesquad-badge.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
      return;
    }
    if (args[0] === "balance") {
      ameApi
      .generate("discordhouse", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false}),
        house: "balance"
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "hypeesquad-badge.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
      return; 
    }
      message.channel.send("Please specify which house badge you want e.g. `e!hypesquad <brilliance/bravery/balance>`")
        }
    } 