const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

module.exports = {
    name: "NSFW",
    category: "General",
    description: "`ass`, `pussy`, `blowjob`, `pgif`, `porn`, `anal`, `4k`, `celebrity`, `cosplay`, `gonewild`, `indian`, `asian`, `milf`, `panties`, `penis`, `pornhub`, `pornstar`, `public`, `schoolgirl`, `thighs`, `uniform`, `upskirt`, `hentai`, `hbj`, `hanal`, `hcum`, `hpussy`",
    aliases: [],
    usage: "NSFW",
    run: async(client, message, args) => {
        const msg = message 
        const embed = new MessageEmbed()
        .addField(`<:ElectroNSFWBadge:680783452563439774> NSFW COMMANDS`,"`ass`, `pussy`, `blowjob`, `pgif`, `porn`, `anal`, `4k`, `celebrity`, `cosplay`, `gonewild`, `indian`, `asian`, `milf`, `panties`, `penis`, `pornhub`, `pornstar`, `public`, `schoolgirl`, `thighs`, `uniform`, `upskirt`,`hentai`, `hbj`, `hanal`, `hcum`, `hpussy`")
        .setColor("#ffbf00")
    message.channel.send(embed)
        }
    } 