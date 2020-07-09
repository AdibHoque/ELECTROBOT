const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);

module.exports = {
    name: "burn",
    category: "Fun",
    description: "Generate a burn image!",
    aliases: [],
    usage: "burn [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("burn", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false})
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "burn.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
        }
    } 