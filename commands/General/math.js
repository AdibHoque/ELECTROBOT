const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const math = require("mathjs");

module.exports = {
    name: "math",
    category: "General",
    description: "Make the bot evaluate your math!",
    aliases: ["add", "deduct", "multiply", "devide"],
    usage: "math <69+69>/<69+69+69>/<69-69>/<69*69>/<69/69>/<69^2>",
    run: async(client, message, args) => {
      let msg = message
           let resp;
    try {
      resp = math.evaluate(args.join(""));
    } catch (e) {
      throw e;
    }
    const embed = new MessageEmbed()
      .setDescription(
        "🔢  |  **" +
          message.member.user.username +
          "**, your expression evaluates to `" +
          resp +
          "`"
      )
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
        }
    } 