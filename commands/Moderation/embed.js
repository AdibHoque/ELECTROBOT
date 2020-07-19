const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "embed",
    category: "Moderation",
    description: "Make a embed with json format!",
    aliases: [],
    usage: "embed <{\"title\": \"your title\", \"description\": \"your description\"}>",
    run: async(client, message, args) => {
        const msg = message 
        if(!args) {
          const a = new MessageEmbed()
          .setTitle("ELECTRO EMBEDS")
          .addField("Variables","title - embed title\nauthor - embed author\ndescription - embed description\nimage - the embed image which stays in bottom\nthumbnail - the small image of top right of embeds\nfield1title - first field title, field1text - first field text\nfield2title - second field title, field2text - second field text\ncolor - embed color\nfooter - embed footer")
          .addField("Example","{\"title\":\"this it the title\",\"description\":\"embed description here\",\"color\":\"#ffbf00\"}")
          .setColor("#ffbf00")
         return message.channel.send(a); 
        }
        if(message.member.hasPermission("ADMINISTRATOR")) {
        const res = JSON.parse(args.join(" "))
        const embed = new MessageEmbed()
        if(res.title) {
          embed.setTitle(res.title)
        }
        if(res.description) { 
          embed.setDescription(res.description)
        }
        if(res.author) {
          embed.setAuthor(res.author)
        }
        if(res.color) {
          embed.setColor(res.color)
        }
        if(res.footer) {
          embed.setFooter(res.footer)
        }
        message.channel.send(embed)
        }
        else {
      message.channel.send("You need the `ADMINISTRATOR` permission to use this command")
    }
    }
    } 
