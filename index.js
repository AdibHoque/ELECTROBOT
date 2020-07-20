const http = require("http");
const express = require("express");
const app = express();
/*app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://electrojs.herokuapp.com/`);
}, 280000);*/

const { Discord, MessageEmbed } = require("discord.js");
const Client = require("./Classes/Client");
const client = new Client();
const loadCMD = require("./functions/loadCMD");
const db = require("quick.db");
const check = "<a:ElectroCheck:709464171825201315>";
const fail = "<a:ElectroFail:656772856184832025>";
let alexa = require("alexa-bot-api");
let ai = new alexa("aw2plm");
const Canvas = require("canvas");
const logs = require('discord-logs');
logs(client);

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

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};

client.on("warn", console.warn);

client.on("error", console.error);

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
  const nsfwembed = new MessageEmbed().setDescription(`<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`).setColor(`#ff0000`);

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
    console.log(`An error occured. ${err}`);
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  db.set(`snipe${message.channel.id}`, {
    mc: message.content,
    sa: message.author.username + `#` + message.author.discriminator,
    saav: message.author.avatarURL(),
    time: `${message.createdAt.toLocaleString()} GMT+0000`
  });
});

client.on('messageUpdate', (oldMessage, newMessage) => {
   if (oldMessage.author.bot) return; 
  const msg = oldMessage
  db.set(`editsnipe${msg.channel.id}`, {mc: msg.content, sa: msg.author.username+`#`+msg.author.discriminator, saav: msg.author.avatarURL(), time: `${msg.createdAt.toLocaleString()} GMT+0000`, after: newMessage.content })
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

client.on('guildMemberBoost', (member) => {
    console.log(`${member.user.tag} just boosted ${member.guild.name}!`);
});

client.on("guildMemberUnboost", (member) => {
  console.log(member.user.tag+" has stopped boosting "+member.guild.name+"...");
});

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
  console.log(guild.name+" reaches the boost level: "+newLevel);
});

client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
  console.log(guild.name+" returned to the boost level: "+newLevel);
});

client.on("guildMemberRoleAdd", (member, role) => {
  console.log(member.user.tag+" acquired the role: "+role.name);
});

client.on("guildMemberRoleRemove", (member, role) => {
  console.log(member.user.tag+" lost the role: "+role.name);
});

client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  console.log(member.user.tag+"'s nickname is now "+newNickname);
});

client.on("messagePinned", (message) => {
  console.log("This message has been pinned : "+message);
});

client.on("messageContentEdited", (message, oldContent, newContent) => {
  console.log("Message '"+message.id+"' has been edited to "+newContent);
});

client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
  console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
});

client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
  console.log(user.tag+" username updated!");
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

/*setInterval(() => {
  const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
  client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
}, 12000); // Runs this every 10 seconds.

setInterval(() => {
  http.get(`http://electrobeta.glitch.me/`);
}, 60000);*/

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
