const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')
module.exports = {
    name: "indian",
    category: "NSFW",
    description: "Indian porn!",
    aliases: ["indianporn"],
    Usage: "indian",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      var subreddits = [
        'DesiBoners',
        'IndianGirls',
        'IndianPorn',
        'IndianTeens' 
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      if(thumb.endsWith(".gif")) { 
        return message.channel.send(thumb) 
                                 }
      if(thumb.startsWith("https://redgifs.com/")) { return message.channel.send(thumb) }
      
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(`[Image not loading? click here it might be a gif or video!](${thumb})`)
        .setImage(thumb)
        .setColor(`#ffbf00`);
      message.channel.send(embed);
    }
    else message.channel.send(nsfwembed)
  } 
  }   