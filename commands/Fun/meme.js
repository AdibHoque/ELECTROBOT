const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')

module.exports = {
    name: "meme",
    category: "Fun",
    description: "Get a fresh meme from reddit!",
    aliases: ["meirl"],
    Usage: "meme",
    run: async (client, message, args, nsfwembed) => { 

      const post = await RedditSimple.RandomPost('me_irl');
      const title = post[0].data.title;
      const thumb = post[0].data.url;
       const ups = post[0].data.ups
       const downs = post[0].data.downs
       const comments = post[0].data.num_comments 
      
      const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(thumb)
        .setFooter(`👍${ups} | 👎${downs} | 💬${comments}`)
      message.channel.send(embed);
        console.log(post[0]);
  } 
  } 
