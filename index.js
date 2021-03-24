const http = require("http");
const express = require("express");
const app = express();
const {get} = require("request-promise-native");
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
/*setInterval(() => {
  http.get(`https://electr.herokuapp.com/`);
}, 280000);*/
setInterval(() => {
  const ty = [
    'hentai',
    'gonewild',
    'thigh',
    'pussy',
    'ass',
    '4k',
    'pgif', 
    'anal',
    'hanal'
    ]
  var types = ty[Math.round(Math.random() * (ty.length - 1))];
  let options = {
url: "https://nekobot.xyz/api/image?type="+types,
json: true
}
get(options).then(async body => {
const p = body.message.replace("https://cdn.nekobot.xyz/","https://electro-bot.glitch.me/api/img/")
const c1 = client.channels.cache.get("738741744602054657")
const c2 = client.channels.cache.get("738787404931923989")
if(c1) c1.send(p)
if(c2) c2.send(p)
}
    )
}, 30000);

setInterval(() => {
  const ty = [
    'cum_jpg',
    'pussy_jpg',
    'pwankg',
    'tits',
    'boobs',
    'bj',
    'cum', 
    'blowjob'
    ]
  var types = ty[Math.round(Math.random() * (ty.length - 1))];
  let options = {
url: "https://nekos.life/api/v2/img/"+types,
json: true
}
get(options).then(async body => {
const p = body.url.replace("https://cdn.nekos.life/","https://electro-bot.glitch.me/api/img/")
const c1 = client.channels.cache.get("738741744602054657")
const c2 = client.channels.cache.get("738787404931923989")
if(c1) c1.send(p)
if(c2) c2.send(p)
}
    )
}, 60000);

const { Discord, MessageEmbed, Util} = require("discord.js");
const Client = require("./Classes/Client");
const client = new Client();
const loadCMD = require("./functions/loadCMD");
loadCMD(client); 
const db = require("quick.db");
const check = "<a:ElectroCheck:709464171825201315>";
const fail = "<a:ElectroFail:656772856184832025>";
let alexa = require("alexa-bot-api");
let ai = new alexa("aw2plm");
const Canvas = require("canvas");
const logs = require('discord-logs');
const mongoose = require('mongoose');
const mongodb_guild = require('./Mongodb/guilds');
const pre = require("./Mongodb/prefix")
const lo = require("./Mongodb/logchannel")
const u = require("./Mongodb/user")
const blapi = require("blapi");
logs(client);

mongoose.connect(`mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(mon => {
  console.log(`Connected to the database!`);
}).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

const apiKeys = {
  "top.gg": process.env.topgg,
  "discord.boats": process.env.boats
} 
blapi.handle(client, apiKeys, 60);
 
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

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};
client.nsfwembed = new MessageEmbed().setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`).setColor(`#ff0000`)

async function dropWallet(prefix, channel, author){
	const amount = Math.round(Math.random()*190+10)
	await db.set(`wallet${channel.id}`,amount)
  await db.delete(`tms${channel.id}`)
	const embed = new MessageEmbed()
  .setAuthor(author.username,author.avatarURL())
	.setTitle("You found a dropped wallet!")
	.setDescription(`Do you want to \`${prefix}pick\` it up?\nOr do you want to \`${prefix}return\` it to it's owner?`)
	.setColor("#ffbf00")
	.setThumbnail("https://cdn.discordapp.com/attachments/656517276832366595/763430782903255100/wallet_2.png")
	channel.send(embed)
	} 

client.on("warn", console.warn);

client.on("error", console.error);

client.on("message", async message => {
  if (message.author.bot) return;
  if (
    message.content.split(" ")[0] == "e!eval" &&
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
  const res = await pre.findOne({name: "prefix", preid: message.guild.id})
  let prefix = res ? res.prefix : "e!";
 // const nsfwembed = new MessageEmbed().setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`).setColor(`#ff0000`);

  if (message.content === "<@629323586930212884>") {
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
  await db.add(`tms${message.channel.id}`,1)
  let totalMessagesSent = await db.get(`tms${message.channel.id}`);
	if ((Math.floor(Math.random() * 50 + 50) < totalMessagesSent)) {
		if (!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return;
		if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return;
		await dropWallet(prefix, message.channel, message.author);
	} 
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
    const userResult = await u.findOne({name: "users", preid: message.author.id})
if(!userResult) {
  let duck = new u({
            _id: new mongoose.Types.ObjectId(),
            name: "users",
            preid: message.author.id,
            usertag: message.author.tag,
            cmdused: 1
          })
  duck.save().catch(console.error)
}
if(userResult) {
    await require('./Mongodb/user.js').updateOne({preid: message.author.id}, {$inc: {cmdused: 1},usertag:message.author.tag});
}
    client.guilds.cache.get("646262196975960074").channels.cache.get("739788363510579290").send(new MessageEmbed().setTitle(message.guild.name).setAuthor(message.member.user.tag, message.member.user.avatarURL({"size":512,"format": "png", "dynamic": true})).setDescription(`Used \`${cmd.name}\` command in ${message.channel.name}\n\`\`\`${prefix}${cmd.name} ${args}\`\`\``).setThumbnail(message.guild.iconURL({"size":512,"format":"png", "dynamic":true})).setColor("#ffbf00"))
  } catch (err) {
    console.log(`An error occured. ${err}`);
  }
});

client.on("messageDelete", async message => {
  if (message.author.bot) return;
  db.set(`snipe${message.channel.id}`, {
    mc: message.content,
    sa: message.author.username + `#` + message.author.discriminator,
    saav: message.author.avatarURL(),
    time: `${message.createdAt.toLocaleString()} GMT+0000`
  });
  const res =  await lo.findOne({name: "logchannel", preid: message.guild.id})
  let lc = res.logchannel 
if(res.logchannel) {
  const embed = new MessageEmbed()
.setTitle(`MESSAGE DELETED`)
.addField(`Message Content`,message.content)
.addField(`Message Author`,message.author.tag)
.addField(`Message Channel`, "<#"+message.channel.id+">")
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(`MESSAGE DELETED`)
.setColor(`#ffbf00`)
message.guild.channels.cache.get(lc).send(embed)
}
else return;
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
   if (oldMessage.author.bot) return; 
  const msg = oldMessage
  db.set(`editsnipe${msg.channel.id}`, {mc: msg.content, sa: msg.author.username+`#`+msg.author.discriminator, saav: msg.author.avatarURL(), time: `${msg.createdAt.toLocaleString()} GMT+0000`, after: newMessage.content })
const res = await lo.findOne({name: "logchannel", preid: msg.guild.id});
if(!res) return; 
const logchannel = res.logchannel;
  const embed = new MessageEmbed()
.setTitle(`MESSAGE EDITED`)
.addField(`Message Author`,msg.author.tag)
.addField(`Old Message`,msg)
.addField(`New Message`,newMessage)
.addField(`Message Channel`, `<#${msg.channel.id}>\n[Jump to Message](https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`)
.setThumbnail(msg.guild.iconURL())
.setTimestamp()
.setFooter(`MESSAGE EDITED`)
.setColor(`#ffbf00`)
msg.guild.channels.cache.get(logchannel).send(embed)
})

client.on("guildMemberAdd", async member => {
  let wChan = await db.fetch(`jc${member.guild.id}`);

  if (wChan == null) return;

  if (!wChan) return;
  try {
    // Background language
    let canvas = Canvas.createCanvas(1024, 450),
      ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/693406590291935252/WELCOME.png"
    );
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw username
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, member.user.username, 48);
    ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);
    // Draw server name
    ctx.font = applyText(canvas, "text", 53);
    ctx.fillText("TO " + member.guild.name, canvas.width - 690, canvas.height - 65);
    // Draw discriminator
    ctx.font = "40px Sans-Serif";
    ctx.fillText(
      member.user.discriminator,
      canvas.width - 623,
      canvas.height - 178
    );
    // Draw number
    ctx.font = "22px Bold";
    ctx.fillText(
      " -" + member.guild.memberCount + "TH MEMBER",
      40,
      canvas.height - 50
    );
    // Draw # for discriminator
    ctx.fillStyle = "#ffbf00";
    ctx.font = "75px SketchMatch";
    ctx.fillText("#", canvas.width - 690, canvas.height - 165);

    // Pick up the pen
    ctx.beginPath();
    //Define Stroke Line
    ctx.lineWidth = 10;
    //Define Stroke Style
    ctx.strokeStyle = "#ffbf00";
    // Start the arc to form a circle
    ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
    // Draw Stroke
    ctx.stroke();
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    let avatar = await Canvas.loadImage(member.user.avatarURL({format: "png", dynamic: true}));
    // Move the image downwards vertically and constrain its height to 200, so it"s a square
    ctx.drawImage(avatar, 45, 90, 270, 270);
    member.guild.channels.cache.get(wChan).send(`${member} JUST JOINED THE SERVER!`, {
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "ELECTRO-WELCOME.png"
        }
      ]
    });
  } catch (e) {
    console.log(e);
    // dont do anything if error occurs
    // if this occurs bot probably can't send images or messages
  }
  /*let mChan = await db.fetch(`mc${member.guild.id}`);
  const c = member.guild.channels.find("id", `${mChan}`)
    c.setName(`membercount-${member.guild.memberCount}`);*/
});

client.on("guildMemberRemove", async member => {
  let lChan = await db.fetch(`lc${member.guild.id}`);

  if (lChan == null) return;

  if (!lChan) return;
  try {
    // Background language
    let canvas = Canvas.createCanvas(1024, 450),
      ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/693406591197904917/GOODBYE.png"
    );
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw username
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, member.user.username, 48);
    ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);
    // Draw server name
    ctx.font = applyText(canvas, "text", 53);
    ctx.fillText("WE WILL MISS YOU :(", canvas.width - 690, canvas.height - 65);
    // Draw discriminator
    ctx.font = "40px Sans-Serif";
    ctx.fillText(
      member.user.discriminator,
      canvas.width - 623,
      canvas.height - 178
    );
    // Draw # for discriminator
    ctx.fillStyle = "#ffbf00";
    ctx.font = "75px SketchMatch";
    ctx.fillText("#", canvas.width - 690, canvas.height - 165);

    // Pick up the pen
    ctx.beginPath();
    //Define Stroke Line
    ctx.lineWidth = 10;
    //Define Stroke Style
    ctx.strokeStyle = "#ffbf00";
    // Start the arc to form a circle
    ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
    // Draw Stroke
    ctx.stroke();
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    let avatar = await Canvas.loadImage(member.user.avatarURL({format: "png", dynamic: true}));
    // Move the image downwards vertically and constrain its height to 200, so it"s a square
    ctx.drawImage(avatar, 45, 90, 270, 270);
    member.guild.channels.cache.get(lChan).send(
        `${member.user.username}#${member.user.discriminator} JUST LEFT THE SERVER!`,
        {
          files: [
            {
              attachment: canvas.toBuffer(),
              name: "ELECTRO-GOODBYE.png"
            }
          ]
        }
      );
  } catch (e) {
    console.log(e);
    // dont do anything if error occurs
    // if this occurs bot probably can't send images or messages
  }
  /*let mChan = await db.fetch(`mc${member.guild.id}`);
  const c = member.guild.channels.find("id", `${mChan}`)
    c.setName(`membercount-${member.guild.memberCount}`);*/
});

client.on('guildMemberBoost',async (member) => {
    //console.log(`${member.user.tag} just boosted ${member.guild.name}!`);
  const res =  await lo.findOne({name: "logchannel", preid: member.guild.id})
  let logchannel = res.logchannel 
if(!logchannel) return; 
  const embed = new MessageEmbed()
  .setTitle(`BOOST ADDED`)
  .setDescription(`\`${member.user.tag}\` just boosted the server!`)
  .setThumbnail("https://cdn.discordapp.com/emojis/713521444256088184.png")
  .setTimestamp()
  .setColor(`#ff80ce`)
member.guild.channels.cache.get(logchannel).send(embed)
});

client.on("guildMemberUnboost", async (member) => {
  //console.log(member.user.tag+" has stopped boosting "+member.guild.name+"...");
 // const logchannel = db.fetch(`log${member.guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: member.guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
  .setTitle(`BOOST REMOVED`)
  .setDescription(`\`${member.user.tag}\` has stopped boosting the server!`)
  .setThumbnail("https://cdn.discordapp.com/emojis/713521356553191526.png")
  .setTimestamp()
  .setColor(`#ff80ce`)
member.guild.channels.cache.get(logchannel).send(embed)
});

client.on("guildBoostLevelUp", async (guild, oldLevel, newLevel) => {
  //console.log(guild.name+" reaches the boost level: "+newLevel);
 // const logchannel = db.fetch(`log${guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
  .setTitle("BOOST LEVEL UP")
  .setDescription(`**${guild.name}** has achieved **Level ${newLevel}**.`)
  .setThumbnail("https://cdn.discordapp.com/emojis/713521444256088184.png")
  .setColor("#ff80ce")
  .setTimestamp()
guild.channels.cache.get(logchannel).send(embed)
});

client.on("guildBoostLevelDown", async (guild, oldLevel, newLevel) => {
 // console.log(guild.name+" returned to the boost level: "+newLevel);
 // const logchannel = db.fetch(`log${guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
  .setTitle("BOOST LEVEL DOWN")
  .setDescription(`**${guild.name}** has lost it's previous level and got down to **Level ${newLevel}**.`)
  .setThumbnail("https://cdn.discordapp.com/emojis/713521356553191526.png")
  .setColor("#ff80ce")
  .setTimestamp()
guild.channels.cache.get(logchannel).send(embed)
});

client.on("guildMemberRoleAdd", async (member, role) => {
 // console.log(member.user.tag+" acquired the role: "+role.name);
 // const logchannel = db.fetch(`log${member.guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: member.guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
.setTitle(`MEMBER ROLES UPDATED`)
.setDescription(`\`${role.name}\` was added to \`${member.user.tag}\`.`)
.setThumbnail(member.guild.iconURL())
.setTimestamp()
.setFooter(`MEMBER ROLES UPDATED`)
.setColor(`#ffbf00`)
member.guild.channels.cache.get(logchannel).send(embed)
});

client.on("guildMemberRoleRemove", async (member, role) => {
 // console.log(member.user.tag+" lost the role: "+role.name);
//  const logchannel = db.fetch(`log${member.guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: member.guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
.setTitle(`MEMBER ROLES UPDATED`)
.setDescription(`\`${role.name}\` was removed from \`${member.user.tag}\`.`)
.setThumbnail(member.guild.iconURL())
.setTimestamp()
.setFooter(`MEMBER ROLES UPDATED`)
.setColor(`#ffbf00`)
member.guild.channels.cache.get(logchannel).send(embed)
});

client.on("guildMemberNicknameUpdate", async (member, oldNickname, newNickname) => {
 // console.log(member.user.tag+"'s nickname is now "+newNickname);
//  const logchannel = db.fetch(`log${member.guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: member.guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
.setTitle(`NICKNAME UPDATED`)
.addField(`User`,member.user.tag)
.addField(`Old Nickname`,oldNickname)
.addField(`New Nickname`,newNickname)
.setThumbnail(member.guild.iconURL())
.setTimestamp()
.setFooter(`NICKNAMED UPDATED`)
.setColor(`#ffbf00`)
member.guild.channels.cache.get(logchannel).send(embed)
});

client.on("messagePinned", async (message) => {
//  console.log("This message has been pinned : "+message);
 // const logchannel = db.fetch(`log${message.guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: message.guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
.setTitle(`MESSAGE PINNED`)
.addField(`Message Content`,message.content)
.addField(`Message Author`,message.author.tag)
.addField(`Message Channel`,`${message.channel}\n[Jump to Message](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(`MESSAGE PINNED`)
.setColor(`#ffbf00`)
message.guild.channels.cache.get(logchannel).send(embed)
});

/*client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
  console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
  const logchannel = db.fetch(`log${role.guild.id}`);
if(!logchannel) return; 
  const embed = new MessageEmbed()
.setTitle(`ROLE POSITION UPDATED`)
.addField(`Role Name`,role.name)
.addField(`Old Position`,oldPosition)
.addField(`New Position`,newPosition)
.setThumbnail(role.guild.iconURL())
.setTimestamp()
.setColor(`#ffbf00`) 
.setFooter(`ROLE POSITION UPDATED`)
role.guild.channels.cache.get(logchannel).send(embed)
});*/

client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
  console.log(user.tag+" username updated!");
});
client.on("guildBanAdd", async (guild, user) => {
 // const logchannel = db.fetch(`log${guild.id}`);
  const res =  await lo.findOne({name: "logchannel", preid: guild.id})
  let logchannel = res.logchannel
if(!logchannel) return; 
  const embed = new MessageEmbed()
.setTitle(`MEMBER BANNED`)
.addField(`User Tag`,user.tag)
.addField(`User ID`,user.id)
.setThumbnail(guild.iconURL())
.setTimestamp()
.setColor(`#ffbf00`)
.setFooter(`MEMBER BANNED`)
 guild.channels.cache.get(logchannel).send(embed)
})

client.on("guildCreate", guild => {
  const embed = new MessageEmbed()
  .setAuthor(`Guild Joined`, client.user.avatarURL())
  .addField(`Guild Name`,guild.name)
  .addField(`Guild ID`, guild.id)
  .addField(`Guild Owner`,guild.owner.user.tag)
  .setThumbnail(guild.iconURL())
  .setColor(`#ffbf00`)
  .setFooter(`Total Guilds: ${client.guilds.cache.size} | Total Users: ${client.users.cache.size}`)
 client.channels.cache.get("656536432500015186").send(embed)
  });

client.on("guildDelete", guild => {
  const embed = new MessageEmbed()
  .setAuthor(`Guild Left`, client.user.avatarURL())
  .addField(`Guild Name`,guild.name)
  .addField(`Guild ID`, guild.id)
  .addField(`Guild Owner`,guild.owner.user.tag)
  .setThumbnail(guild.iconURL())
  .setColor(`#ffbf00`)
  .setFooter(`Total Guilds: ${client.guilds.cache.size} | Total Users: ${client.users.cache.size}`)
 client.channels.cache.get("656536492977553438").send(embed)

  });



function extension(reaction, attachment) {
  const imageLink = attachment.split(".");
  const typeOfImage = imageLink[imageLink.length - 1];
  const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
  if (!image) return "";
  return attachment;
}

client.on("ready", async () => {
   // client.user.setActivity(`e!help | ${client.guilds.cache.size}`); 
  const k = (client.users.cache.size/1000).toFixed(2)
  const activities_list = [
    "e!help | "+client.guilds.cache.size+" Guilds", 
    "e!help | "+k+"k Users",
    "e!help | "+client.guilds.cache.size+" Guilds",
    "e!help | "+k+"k Users"
    ];
  setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 12000); // Runs this every 12 seconds.
  console.log(
    `Logged in as ${client.user.tag}, with ${client.guilds.cache.size} guilds, ${client.users.cache.size} users, ${client.channels.cache.size} channels.`
  );
const ocl = client.channels.cache.get("822491229961977887")
if(ocl) ocl.send("Client is online & ready to be used!")
});

client.login(process.env.Token);
