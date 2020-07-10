const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);

module.exports = {
    name: "tobecontinued",
    category: "Fun",
    description: "Generate a tobecontinued image!",
    aliases: ["tbc"],
    usage: "tobecontinued [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("tobecontinued", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false})
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "tobecontinued.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
        }
    } 