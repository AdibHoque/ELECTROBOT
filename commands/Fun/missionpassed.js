const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);

module.exports = {
    name: "missionpassed",
    category: "Fun",
    description: "Generate a missionpassed image!",
    aliases: [],
    usage: "missionpassed [@user]",
    run: async(client, message, args) => {
        const msg = message 
        let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("missionpassed", {
        url: mention.user.avatarURL()
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "missionpassed.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
        }
    } 