const {MessageEmbed} = require("discord.js")
const PornHub = require("pornhub.js");
const pornhub = new PornHub();
module.exports = {
    name: "pornhub",
    category: "NSFW",
    description: "Search pornhub video pages!",
    aliases: ["ph"],
    Usage: "pornhub <search text>",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      const t = args.join(" ")
      pornhub.search("Video", t).then(res => {
        res.data.forEach(item => {
          console.log(item.title);
          const embed = new MessageEmbed()
            .setTitle(item.title, item.url)
            .setDescription(
              `[Watch online on Pornhub](`+item.url+`) | [Download for FREE](${item.url.replace("pornhub","pornhubdownload")})`
            )
            .setColor(`#ffbf00`)
            .setFooter(`Duration: ` + item.duration)
            .setImage(`${item. preview}`)
          message.channel.send(embed);
        });
      });
    }
    else return message.channel.send(nsfwembed)
  } 
  }  
