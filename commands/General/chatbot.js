const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
let alexa = require("alexa-bot-api");
let ai = new alexa("aw2plm"); 

module.exports = {
    name: "chatbot",
    category: "General",
    description: "Chat with the bot!",
    aliases: ["talk", "ai", "chat"],
    usage: "chatbot <text>",
    run: async(client, message, args) => {
      const h = message.content.split(" ");
      const kwargs = h.slice(1).join(" ");
      const msg = message
        if (!kwargs) {
      const em = new RichEmbed()
        .addField("COMMAND USAGE", "`e!chatbot <text>`")
        .addField("COMMAND EXAMPLE", "`e!chatbot hello`")
        .setFooter(
          "PROTIP: If you don't want to use the command again & again, just create a channel named #chatbot where you can just type the text for response!"
        )
        .setColor(`#ffbf00`);
      msg.channel.send(em);
    } else {
      msg.channel.startTyping();
      const reply = await ai.getReply(kwargs);
      msg.channel.stopTyping();
      var Google = ["#0F9D58", "#DB4437", "#4285F4", "#FFBF00"];
      var gcolor = Google[Math.round(Math.random() * (Google.length - 1))];
      const embed = new RichEmbed()
        .setColor(gcolor)
        .setFooter(
          `${reply}`,
          "https://cdn.discordapp.com/emojis/646994210939076618.gif"
        );
      msg.channel.send(`${msg.author}`, embed);
    } 
        }
    }  