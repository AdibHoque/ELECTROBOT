const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')

module.exports = {
    name: "meme",
    category: "Fun",
    description: "Get a fresh new joke from reddit!",
    aliases: ["jokes"],
    Usage: "joke",
    run: async (client, message, args, nsfwembed) => { 
      
      const post = await RedditSimple.RandomPost('jokes');
      const title = post[0].data.title;
      const desc = "."//post[0].data
      const permalink = "https://reddit.com/"+post[0].data.permalink;
       const ups = post[0].data.ups;
       const downs = post[0].data.downs;
       const comments = post[0].data.num_comments;
      
      const embed = new MessageEmbed()
        .setTitle(title,permalink) 
        .setDescription(desc)
        .setFooter(`👍 ${ups} | 💬 ${comments} - r/${sub}`)
      message.channel.send(embed);
     console.log(post[0].data)
  } 
  } 
