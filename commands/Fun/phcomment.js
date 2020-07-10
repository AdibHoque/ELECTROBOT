const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const fetch = require("node-fetch");

module.exports = {
    name: "phcomment",
    category: "Fun",
    description: "Pornhub comment simulation!",
    aliases: ["phubcomment", "pornhubcomment", "phc"],
    usage: "phcomment [@user] <text>",
    run: async(client, message, args) => {
        const msg = message 
        const mention = message.mentions.members.first() || message.member
        let text = args.slice(1).join(" ");
    let res = await fetch(
      encodeURI(
        `https://nekobot.xyz/api/imagegen?type=phcomment&username=${mention.user.username}&image=${mention.user.avatarURL({format: "png", size: 1024, dynamic: false})}&text=${text}`
      )
    );
    let json = await res.json();
    msg.channel.send({
      files: [
        {
          attachment: json.message,
          name: "pornhub.png"
        }
      ]
    });
        }
    } 