const {MessageEmbed} = require("discord.js")
const {RedditSimple} = require('reddit-simple')

module.exports = {
    name: "joke",
    category: "Fun",
    description: "Get a fresh new joke from reddit!",
    aliases: ["jokes"],
    Usage: "joke",
    run: async (client, message, args) => { 
      
      const post = await RedditSimple.RandomPost('jokes');
      const title = post[0].data.title;
      const desc = post[0].data.selftext;
      const permalink = "https://reddit.com/"+post[0].data.permalink;
       const ups = post[0].data.ups;
       const downs = post[0].data.downs;
       const comments = post[0].data.num_comments;
      
      const embed = new MessageEmbed()
        .setTitle(title) 
        .setURL(permalink) 
        .setDescription(desc)
        .setFooter(`👍 ${ups} | 💬 ${comments}`)
      message.channel.send(embed);
     console.log(post[0].data)
  } 
  } 
