const {Discord, MessageEmbed} = require("discord.js");
const {get} = require("request-promise-native"); 
const {ReactionPages} = require("reconlx");
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
	    //return message.channel.send("This command is on maintenance")
        let word = args.join("+");
    if (!word) {
      return message.channel.send("Specify a word to define!");
    }
    
let options = {
url: "https://api.urbandictionary.com/v0/define?term="+word,
json: true
}        
const body = await get(options)
if(!body.list.length) return message.channel.send("Word not found!")

let pages = []
	    
body.list.forEach(d => {    
    const embed = new MessageEmbed().setTitle(d.word).setAuthor(d.author).setURL(d.permalink).addField("Definition", "```" + d.definition + "```").addField("Example", "```" + d.example + "```").setFooter(`👍` + d.thumbs_up + ` | ` + `👎` + d.thumbs_Down).setColor(`#FFBF00`);
    pages.push(embed)
});
    const textPageChange = false;
    const emojis = ["⏪", "⏩"];
    const time = 30000;
    ReactionPages(message, pages, textPageChange, emojis, time); 
  }
}
