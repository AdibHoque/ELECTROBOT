const {MessageEmbed} = require("discord.js")
const PornHub = require("pornhub.js");
const pornhub = new PornHub();
 
module.exports = {
    name: "pornstar",
    category: "NSFW",
    description: "Search pornhub page of your favorite pornstar!",
    aliases: ["pstar"],
    Usage: "pornstar <name>",
    run: async (client, message, args, nsfwembed) => { 
    if (message.channel.nsfw === true) {
      const t = args.join(" ")
      pornhub.search("Pornstar", t).then(item => {
        const embed = new MessageEmbed()
          .setTitle(item.data[0].name, item.data[0].url)
          .setDescription(
            `[Click Here To View Page!](` + item.data[0].url + `)`
          )
          .setImage(item.data[0].photo)
          .setColor(`#ffbf00`)
          .addField(`🎈 Rank:`, `#` + item.data[0].rank)
          .addField(`💟 Views:`, item.data[0].views)
          .addField(`🎬 Video Count:`, item.data[0].videoNum);
        message.channel.send(embed);
      });
    }
    else {
      message.channel.send(nsfwembed)
    }}}