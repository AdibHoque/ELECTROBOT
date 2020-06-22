const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const {Discord, MessageEmbed} = require("discord.js");
const Client = require("./Classes/Client");
const client = new Client();
const loadCMD = require("./functions/loadCMD");
const db = require("quick.db");
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

loadCMD(client);

async function delay(delayInms) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, delayInms);
      });
}

client.on("message", async(message) => {
    if(message.author.bot) return;
    const prefix = await db.fetch(`prefix_${message.guild.id}`) || "eb!"
    //if(!prefix) prefix = process.env.Prefix
    const nsfwembed = new MessageEmbed()
  .setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`)
  .setColor(`#ff0000`) 
    
    if (message.mentions.users.first() == client.user) {
    const embed = new Discord.MessageEmbed()
    .setTitle(`ELECTRO Tips`)
    .setDescription(`To learn how to use the bot, please use the \`${prefix}help\` command.`)
    .addField(`Current Prefix`,`The current prefix in this server is \`${prefix}\`.`)
    .addField(`Invite The Bot`,`https://discord.com/api/oauth2/authorize?client_id=629323586930212884&permissions=2146827775&scope=bot`)
    .addField(`Support Server`,`https://discord.gg/dAggRh9`)
    .setColor(`#ffbf00`)
    .setFooter(`Contact Us: electrobot6969@gmail.com`)
    message.channel.send(embed);
  } 
    /*if (message.author.id == "496978159724396545" && message.guild.id == "716668695681695767") {
      message.react("⭐")
    }*/
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const commands = args.shift().toLowerCase();

    var cmd = client.commands.get(commands);

    if (commands.length === 0) return;
  
  if (!cmd) cmd = client.commands.get(client.aliases.get(commands));
    try {
        cmd.run(client, message, args, prefix);
    }catch(err) {
        console.log(`An error occured. Please report to the developers.`)
    }
});

client.on("ready", async() => {
  client.user.setActivity(`Switching from d.py async & d.js v11 to d.js v12`)
    console.log(`Logged in as ${client.user.tag}, with ${client.guilds.cache.size} guilds, ${client.users.cache.size} users, ${client.channels.cache.size} channels.`);
});


client.login(process.env.Token);


