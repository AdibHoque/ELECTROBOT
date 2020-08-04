const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
}; 

module.exports = {
    name: "blowjob",
    category: "NSFW",
    description: "Blowjob porn",
    aliases: ["bj"],
    Usage: "blowjob",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      var subreddits = [
        'blowjobs', 
        'blowjob',
        'casualblowjobs',
        'BlowjobEyeContact',
        'girlsfinishingthejob', 
        'deepthroat',
        'oralcreampies',
        'iwanttosuckcock',
        'BlowjobSelfies',
        'BlowjobSelfies'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      if(thumb.endsWith(".gifv")) { 
        return message.channel.send(thumb) 
      }
      if(thumb.endsWith(".gif")) {
        return message.channel.send(thumb)
      }
                                 
     // if(thumb.startsWith("https://redgifs.com/")) { return message.channel.send(thumb) }
      
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