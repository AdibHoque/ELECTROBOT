const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://electrojs.herokuapp.com/`);
}, 280000);

const { Discord, MessageEmbed } = require("discord.js");
const Client = require("./Classes/Client");
const client = new Client();
const loadCMD = require("./functions/loadCMD");
const db = require("quick.db");
const check = "<a:ElectroCheck:709464171825201315>";
const fail = "<a:ElectroFail:656772856184832025>";
let alexa = require("alexa-bot-api");
let ai = new alexa("aw2plm");

loadCMD(client);

async function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delayInms);
  });
}

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

client.on("message", async message => {
  if (message.author.bot) return;
  if (
    message.content.split(" ")[0] == "eb!eval" &&
    message.author.id === "496978159724396545"
  ) {
    try {
      const code = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  if (message.channel.name === "chatbot" && !message.author.bot) {
    message.channel.startTyping();
    const reply = await ai.getReply(message.content);
    message.channel.stopTyping();
    var Google = ["#0F9D58", "#DB4437", "#4285F4", "#FFBF00"];
    var gcolor = Google[Math.round(Math.random() * (Google.length - 1))];
    const embed = new MessageEmbed()
      .setColor(`#ffbf00`)
      .setFooter(
        `${reply}`,
        "https://cdn.discordapp.com/emojis/646994210939076618.gif"
      );
    message.channel.send(`${message.author}`, embed);
  }
  const p = ["eb!", "<@715843336417837156>"];
  const pr = [
    await db.fetch(`prefix_${message.guild.id}`),
    "<@715843336417837156>"
  ];
  const prefix =
    (await db.fetch(`prefix_${message.guild.id}`)) ||
    "eb!" ||
    "<@715843336417837156>";
  //if(!prefix) prefix = process.env.Prefix
  const nsfwembed = new MessageEmbed()
    .setDescription(
      `<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`
    )
    .setColor(`#ff0000`);

  if (message.content === "<@715843336417837156>") {
    const embed = new MessageEmbed()
      .setTitle(`ELECTRO Tips`)
      .setDescription(
        `To learn how to use the bot, please use the \`${prefix}help\` command.`
      )
      .addField(
        `Current Prefix`,
        `The current prefix in this server is \`${prefix}\`.`
      )
      .addField(
        `Invite The Bot`,
        `https://discord.com/api/oauth2/authorize?client_id=629323586930212884&permissions=2146827775&scope=bot`
      )
      .addField(`Support Server`, `https://discord.gg/dAggRh9`)
      .setColor(`#ffbf00`)
      .setFooter(`Contact Us: electrobot6969@gmail.com`);
    message.channel.send(embed);
  }
  /*if (message.author.id == "496978159724396545" && message.guild.id == "716668695681695767") {
      message.react("⭐")
    }*/
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const commands = args.shift().toLowerCase();

  var cmd = client.commands.get(commands);

  if (commands.length === 0) return;

  if (!cmd) cmd = client.commands.get(client.aliases.get(commands));
  try {
    cmd.run(client, message, args, prefix);
  } catch (err) {
    console.log(`An error occured. Please report to the developers.`);
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  db.set(`snipe${message.channel.id}`, {
    mc: message.content,
    sa: message.author.username + message.author.discriminator,
    saav: message.author.avatarURL(),
    time: `${message.createdAt.toLocaleString()} GMT+0000`
  });
});

client.on('messageUpdate', (oldMessage, newMessage) => {
   if (oldMessage.author.bot) return; 
  const msg = oldMessage
  db.set(`editsnipe${msg.channel.id}`, {mc: msg.content, sa: msg.author.username+msg.author.discriminator, saav: msg.author.avatarURL(), time: `${msg.createdAt.toLocaleString()} GMT+0000`, after: newMessage.content })
})

client.on("messageReactionAdd", (reaction, user) => {
  const message = reaction.message;
  if (reaction.emoji.name !== "⭐") return;
  //if (message.author.id === user.id)
  if (message.author.bot) return;
  const { starboardChannel } = db.fetch(`starboard${message.guild.id}`);
  const starChannel = message.guild.channels.cache.find("id", starboardChannel);
  if (!starChannel) return;
  const fetchedMessages = starChannel.fetchMessages({ limit: 100 });
  const stars = fetchedMessages.find(
    m =>
      m.embeds[0].footer.text.startsWith("⭐") &&
      m.embeds[0].footer.text.endsWith(message.id)
  );
  if (stars) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
      stars.embeds[0].footer.text
    );
    const foundStar = stars.embeds[0];
    const image =
      message.attachments.size > 0
        ? this.extension(reaction, message.attachments.first().attachment)
        : "";
    const embed = new MessageEmbed()
      .setColor(foundStar.color)
      .setDescription(foundStar.description)
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`)
      .setImage(image);
    const starMsg = starChannel.fetchMessage(stars.id);
    starMsg.edit(embed);
  }
  if (!stars) {
    const image =
      message.attachments.size > 0
        ? this.extension(reaction, message.attachments.first().attachment)
        : "";
    if (image === "" && message.cleanContent.length < 1) return;
    const embed = new MessageEmbed()
      .setColor(15844367)
      .setDescription(message.cleanContent)
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp(new Date())
      .setFooter(`⭐ 1 | ${message.id}`)
      .setImage(image);
    starChannel.send(embed);
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  const message = reaction.message;
  if (message.author.id === user.id) return;
  if (reaction.emoji.name !== "⭐") return;
  const { starboardChannel } = db.fetch(`starboard${message.guild.id}`);
  const starChannel = message.guild.channels.cache.find("id", starboardChannel);
  if (!starChannel) return;
  const fetchedMessages = starChannel.fetchMessages({ limit: 100 });
  const stars = fetchedMessages.find(
    m =>
      m.embeds[0].footer.text.startsWith("⭐") &&
      m.embeds[0].footer.text.endsWith(reaction.message.id)
  );
  if (stars) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
      stars.embeds[0].footer.text
    );
    const foundStar = stars.embeds[0];
    const image =
      message.attachments.size > 0
        ? this.extension(reaction, message.attachments.array()[0].url)
        : "";
    const embed = new MessageEmbed()
      .setColor(foundStar.color)
      .setDescription(foundStar.description)
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter(`⭐ ${parseInt(star[1]) - 1} | ${message.id}`)
      .setImage(image);
    const starMsg = starChannel.fetchMessage(stars.id);
    starMsg.edit({ embed });
    if (parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
  }
});

function extension(reaction, attachment) {
  const imageLink = attachment.split(".");
  const typeOfImage = imageLink[imageLink.length - 1];
  const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
  if (!image) return "";
  return attachment;
}

const activities_list = [
  "Switching to d.js v12",
  "Remaking py commands in js",
  "Converting d.js v11 to v12"
];

setInterval(() => {
  const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
  client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
}, 12000); // Runs this every 10 seconds.

setInterval(() => {
  http.get(`http://electrobeta.glitch.me/`);
}, 60000);

client.on("ready", async () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 12000);
  console.log(
    `Logged in as ${client.user.tag}, with ${client.guilds.cache.size} guilds, ${client.users.cache.size} users, ${client.channels.cache.size} channels.`
  );
});

client.login(process.env.Token);
