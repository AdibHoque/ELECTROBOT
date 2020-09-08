const ms = require('parse-ms');
const Discord = require('discord.js');
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

module.exports = {
    name: "balance",
    category: "Economy",
    description: "Get to know your balance",
    aliases: ["bal","money","bank"],
    usage: "balance",
    run: async(client, message, args) => {
      const userResult = await u.findOne({name: "users", preid: message.author.id})
        const msg = message 
        const bal = userResult.balance ? userResult.balance : 0;
      const embed = new Discord.MessageEmbed()
      .setTitle(`BALANCE`)
      .setDescription(`You currently have **$${bal}**!`)
      .setThumbnail(`https://cdn.glitch.com/7be22abc-1b5d-415c-ba45-ac77001d72be%2Fpiggy-bank.png`)
      .setColor(`#ffbf00`)
      message.channel.send(embed);
}
}