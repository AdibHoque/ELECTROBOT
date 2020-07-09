const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);

module.exports = {
    name: "brazzers",
    category: "Fun",
    description: "Get a brazzers stamp on avatar!",
    aliases: [],
    usage: "brazzers [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("brazzers", {
        url: mention.user.avatarURL({size: 1024, format: "png", dynamic: false})
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "brazzers.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
        }
    } 