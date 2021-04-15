const {Discord, MessageEmbed} = require("discord.js");
const {get} = require("request-promise-native"); 

/*const ud = require("relevant-urban");
const querystring = require('querystring');
const fetch = require('node-fetch');*/

module.exports = {
    name: "define",
    category: "General",
    description: "Fetch definitions from Urban-Dictionary!",
    aliases: ["urban", "df", "ud"],
    usage: "define <word>",
    run: async(client, message, args) => {
	    return message.channel.send("This command is on maintenance")
        /*let word = args.join("+");
    if (!word) {
      return message.channel.send("Specify a word to define!");
    }
    
let options = {
url: "https://api.urbandictionary.com/v0/define?term="+word,
json: true
}    
	    
const body = await get(options)



    const embed = new MessageEmbed()
      .setTitle(defin.word)
      .setAuthor(defin.author)
      .setURL(defin.urbanURL)
      .addField("Definition", "```" + defin.definition + "```")
      .addField("Example", "```" + defin.example + "```")
      .setFooter(`👍` + defin.thumbsUp + ` | ` + `👎` + defin.thumbsDown)
      .setColor(`#FFBF00`);
    message.channel.send(embed);*/
  }
}
