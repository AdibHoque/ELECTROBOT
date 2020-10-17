const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')
const nsfwembed = new MessageEmbed().setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`).setColor(`#ff0000`);
module.exports = {
    name: "arab",
    category: "NSFW",
    description: "Arab porn!",
    aliases: ["hijab"],
    Usage: "arab",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      var subreddits = [
        "RepressedGoneWild",
        "HijabiXXX",
        "muslimgirls",
        "NSFWHijab",
        "ArabPorn"
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      message.channel.send(`**r/${sub}**\n${title}\n${thumb}`)
      /*if(thumb.endsWith(".gifv")) { 
        return message.channel.send(thumb) 
                                 }
      if(thumb.endsWith(".gif")) {
        return message.channel.send(thumb)
      }
      if(thumb.startsWith("https://redgifs.com/")) { return message.channel.send(thumb) }
      
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(`[Image not loading? click here it might be a gif or video!](${thumb})`)
        .setImage(thumb)
        .setFooter("r/"+sub)
        .setColor(`#ffbf00`);
      message.channel.send(embed);*/
    }
    else message.channel.send(nsfwembed)
  } 
  }