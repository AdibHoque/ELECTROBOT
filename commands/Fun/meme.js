const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')

module.exports = {
    name: "meme",
    category: "Fun",
    description: "Get a fresh meme from reddit!",
    aliases: ["memes"],
    Usage: "meme",
    run: async (client, message, args, nsfwembed) => { 
      
        var subreddits = ['me_irl','me_irl','memes','dankmemes','historymemes','goodanimemes','programmerhumor','cursedcomments','cursedcomments']
    let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        
       if(args[0] && subreddits.includes(args[0].toLowerCase())) sub = args[0];
        
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const permalink = "https://reddit.com/"+post[0].data.permalink;
       const ups = post[0].data.ups;
       const downs = post[0].data.downs;
       const comments = post[0].data.num_comments;
      
      const embed = new MessageEmbed()
        .setTitle(title) 
        .setURL(permalink) 
        .setImage(thumb)
        .setFooter(`👍 ${ups} | 💬 ${comments} - r/${sub}`)
      message.channel.send(embed);
  } 
  } 
