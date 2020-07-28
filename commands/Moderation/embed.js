const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed

module.exports = {
    name: "embed",
    category: "Moderation",
    description: "Make a embed with json format!",
    aliases: ["customembed"],
    usage: "embed <{\"title\": \"your title\", \"description\": \"your description\"}>",
    run: async(client, message, args) => {
        const msg = message 
        if(!args[0]) {
          const a = new MessageEmbed()
          .setAuthor("ELECTRO CUSTOM EMBEDS",client.user.avatarURL({format: "png"}))
          .setDescription("All of the variables are optional, but you must have one of them except the color or thumbnail variable.")
          .addField("Variables","`title` - The embed title [Text]\n`author` - The embed author [Text]\n`description` - The embed description [Text]\n`image` - The embed big image [URL]\n`thumbnail` - The embed small image [URL]\n`field1title` - First field title [Text], `field1text` - First field text [Text]\n`field2title` - Second field title [Text], `field2text` - Second field text [Text]\n`color` - Embed color [HEX]\n`footer` - Embed footer [Text]")
          .addField("Example","{\"title\":\"this it the title\",\"description\":\"this is the description here\",\"color\":\"#ffbf00\",\"footer\":\"this is the footer\"}")
          .setImage("https://cdn.discordapp.com/attachments/656517276832366595/737686723294789662/Screenshot_20200728-210158-1.jpg")
          .setColor("#ffbf00")
         return message.channel.send(a); 
        }
        if(args[0] && message.member.hasPermission("ADMINISTRATOR")) {
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
        if(res.field1text && res.field1title) {
          embed.addField(res.field1title,res.field1text)
        }
        if(res.field2text && res.field2title) {
          embed.addField(res.field2title, res.field2text)
        }
        if(res.image) {
          embed.setImage(res.image)
        }
        if(res.thumbnail) {
          embed.setThumbnail(res.thumbnail)
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
