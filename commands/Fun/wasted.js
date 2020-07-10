const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);

module.exports = {
    name: "wasted",
    category: "Fun",
    description: "Generate a gta wasted image!",
    aliases: [],
    usage: "wasted [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("wasted", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false})
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "wasted.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
        }
    } 