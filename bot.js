const http = require("http");
const httppost = require("http-post");
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

const {
  Client,
  Util,
  MessageEmbed,
  MessageAttachment,
  RichEmbed,
  avatarURL
} = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const PREFIX = "e!";
const talkedRecently = new Set();
const randomPuppy = require("random-puppy");
const request = require("node-fetch");
const fs = require("fs");
const superagent = require("superagent");
const ud = require("relevant-urban");
const nekoapi = require("nekos-image-api");
const ameClient = require("amethyste-api");
const ameApi = new ameClient(process.env.AME_TOKEN);
const math = require("mathjs");
const client = new Client({ disableEveryone: true });
const nclient = require("nekos.life");
const neko = new nclient();
const Canvas = require("canvas");
const db = require("quick.db");
const PornHub = require("pornhub.js");
const pornhub = new PornHub();
const ip = require("what-is-my-ip-address");
const BrawlStars = require("brawlstars");
const bs = new BrawlStars.Client({ token: process.env.BRAWL_API_KEY });
const ms = require("ms");
const Danbooru = require("danbooru");
const booru = new Danbooru();
const { RedditSimple } = require("reddit-simple");
const webhoo = require("webhook-discord");
const DEL = require("discordextremelist.xyz");
const cl = new DEL.Client("629323586930212884", process.env.Extreme);
const BOATS = require("boats.js");
const Boats = new BOATS(
  "l37mXPUGhg7qpiV8PTGKobihPbdmVLtvGz78NBYo91NLJU7bsA2C4OU7YV5yNEnMGI1l8VznoFgrCmUZzNr0xQyrkLF8ktEKoFvTuBrQkc3UM1x3y9FVwZ5bJHvKPHtwIGAMdsDmwMKRMXOCWZBqCCmPmCG"
);
const blapi = require("blapi");
const reverse = require("reverse-text");
let alexa = require("alexa-bot-api");
let ai = new alexa("aw2plm"); //access key free :)
const WebCapture = require("webpage-capture");
const Pokedex = require("pokedex.js");
const pokedex = new Pokedex("en");

Boats.postStats(client.guilds.size, "629323586930212884")
  .then(() => {
    console.log("Successfully updated server count.");
  })
  .catch(err => {
    console.error(err);
  });

const botID = "629323586930212884";

const apiKeys = {
  "bots.ondiscord.xyz": process.env.BotsOnDiscord,
  "discordextremelist.xyz": process.env.Extreme,
  "discord.boats": process.env.Boats,
  "bladebotlist.xyz": process.env.BBL
};

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};

const youtube = new YouTube(process.env.YOUTUBE_API_KEY);

const queue = new Map();
client.on("warn", console.warn);

client.on("error", console.error);

client.on("ready", () => {
  console.log("Online");
  blapi.manualPost(client.guilds.size, botID, apiKeys);
  console.log("Yo this ready!");
});

client.on("disconnect", () =>
  console.log(
    "I just disconnected, making sure you know, I will reconnect now..."
  )
);

client.on("reconnecting", () => console.log("I am reconnecting now!"));

client.on("message", async msg => {
  if (
    msg.author.id == "631117170306449428" &&
    msg.guild.id == "646262196975960074"
  ) {
    msg.embeds.forEach(e => {
      if (
        e.description !== undefined &&
        e.description.startsWith(
          "You can leave without losing coins." || "You joined this"
        )
      ) {
        msg.delete(msg).catch(error => console.log(error));
      }
    });
  }
  if (
    msg.author.id == "631117170306449428" &&
    msg.guild.id == "646262196975960074"
  ) {
    msg.embeds.forEach(e => {
      if (
        e.description !== undefined &&
        e.description.startsWith("You joined this")
      ) {
        msg.delete(msg).catch(error => console.log(error));
      }
    });
  }
  /*if (
    msg.author.user.id == "496978159724396545" &&
    msg.guild.id == "646262196975960074"
  ) {
    msg.react(`⭐`);
  }*/
  if (
    msg.author.id == "631117170306449428" &&
    msg.content.startsWith("**WARNING")
  ) {
    msg.delete(msg);
  }
  if (msg.channel.name === "chatbot" && !msg.author.bot) {
    msg.channel.startTyping();
    const reply = await ai.getReply(msg.content);
    msg.channel.stopTyping();
    var Google = ["#0F9D58", "#DB4437", "#4285F4", "#FFBF00"];
    var gcolor = Google[Math.round(Math.random() * (Google.length - 1))];
    const embed = new RichEmbed()
      .setColor(gcolor)
      .setFooter(
        `${reply}`,
        "https://cdn.discordapp.com/emojis/646994210939076618.gif"
      );
    msg.channel.send(`${msg.author}`, embed);
  }

  // eslint-disable-line

  if (!msg.content.startsWith(PREFIX)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const t = args.slice(1).join(" ");
  const options = {
    page: 1,
    order: "Most Relevant"
  };
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let message = msg;
  const MessageEmbed = RichEmbed;
  const everyone = message.guild.roles.find(r => r.name === "@everyone");
  const nsfwembed = new RichEmbed()
    .setDescription(
      `<a:ElectroAdultContentWarning:709467180642730055> **| PLEASE SWITCH TO A NSFW MARKED CHANNEL TO USE THIS COMMAND!**`
    )
    .setColor(`#ff0000`);

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);
  if (command === "pussy") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "pussy" })
        .end((err, response) => {
          const embed = new RichEmbed()
            .setTitle("Pussy")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "pftest") {
    let member = message.mentions.members.first() || message.member
    let canvas = Canvas.createCanvas(675, 350),
      ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://cdn.glitch.com/79f3a8c5-55fb-4c13-bd4a-3d24260992ff%2FPfUi.png?v=1592058232162"
    );
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw username
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(
      canvas,
      member.user.username + `#` + member.user.discriminator,
      35
    );
    // wrapText(ctx, member.user.username+`#`+member.user.discriminator, 15, 235, 250, 32); 
    ctx.fillText(
      member.user.username + `#` + member.user.discriminator,
      canvas.width - 640,
      canvas.height - 105
    );
    // Credits
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, "+696969", 35);
    ctx.textAlign = "middle";
    ctx.fillText("69.69k", 445, 108, 114);
    // Redeems
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, ``, 35);
    ctx.textAlign = "middle";
    ctx.fillText(`696`, 445, 205, 114);
    // Pokemons
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, ``, 35);
    ctx.textAlign = "middle";
    ctx.fillText(`1000`, 445, 305, 114);

    // Pick up the pen
    ctx.beginPath();
    //Define Stroke Line
    ctx.lineWidth = 10;
    //Define Stroke Style
    ctx.strokeStyle = "#5dbb83";
    // Start the arc to form a circle
    ctx.arc(162, 124, 73, 0, Math.PI * 2, true);
    // Draw Stroke
    ctx.stroke();
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    let avatar = await Canvas.loadImage(member.user.avatarURL);
    // Move the image downwards vertically and constrain its height to 200, so it"s a square
    ctx.drawImage(avatar, 88, 51, 146, 146);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "profile.png"
        }
      ]
    });
  } 
  if (command === "webhooktest") {
    msg.channel
      .createWebhook(
        "Members+ Premium",
        "https://cdn.discordapp.com/avatars/631117170306449428/648d5a274fd963f5c70a83dbfd697a60.webp?size=1024"
      )
      .then(webhook =>
        webhook
          .edit(
            "Members+ Premium",
            "https://cdn.discordapp.com/avatars/631117170306449428/648d5a274fd963f5c70a83dbfd697a60.webp?size=1024"
          )
          .catch(error => console.log(error))
      )
      .then(wb =>
        msg.channel
          .send(
            `Here is your webhook https://discordapp.com/api/webhooks/${wb.id}/${wb.token}\n\nPlease keep this safe, as you could be exploited.`
          )
          .catch(error => console.log(error))
      )
      .catch(error => console.log(error));
  }
  if (command === "pornhub") {
    if (msg.channel.nsfw === true) {
      pornhub.search("Video", t).then(res => {
        res.data.forEach(item => {
          console.log(item.title);
          const embed = new RichEmbed()
            .setTitle(item.title, item.url)
            .setDescription(`[Click Here To View Page!](` + item.url + `)`)
            .setColor(`#ffbf00`)
            .setFooter(`Duration: ` + item.duration);
          msg.channel.send(`${item.preview}`, embed);
        });
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "pornstar") {
    if (msg.channel.nsfw === true) {
      pornhub.search("Pornstar", t).then(item => {
        const embed = new RichEmbed()
          .setTitle(item.data[0].name, item.data[0].url)
          .setDescription(
            `[Click Here To View Page!](` + item.data[0].url + `)`
          )
          .setImage(item.data[0].photo)
          .setColor(`#ffbf00`)
          .addField(`🎖 Rank:`, `#` + item.data[0].rank)
          .addField(`👁 Views:`, item.data[0].views)
          .addField(`📹 Video Count:`, item.data[0].videoNum);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "ss") {
    if (msg.channel.nsfw === true) {
      const img = await new WebCapture().capture("https://google.com");
      msg.channel.send({
        files: [{ attachment: img, name: "spoiler.png" }]
      });
    }
  }
  if (command === "upskirt") {
    if (msg.channel.nsfw === true) {
      const post = await RedditSimple.RandomPost("upskirt");
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "milf") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["milf", "milfs"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "uniform") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["MilitaryGoneWild", "sexyuniforms"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "scporn") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["NSFW_Snapchat", "snapchatgw"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "public") {
    if (msg.channel.nsfw === true) {
      var subreddits = [
        "naughtyinpublic",
        "gwpublic",
        "exposedinpublic",
        "beachgirls"
      ];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "asian") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["AsianHotties", "juicyasians", "asianbabes"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "cosplay") {
    if (msg.channel.nsfw === true) {
      var subreddits = [
        "nsfwcosplay",
        "cosplayonoff",
        "cosporn",
        "cosplayboobs"
      ];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "dick") {
    if (msg.channel.nsfw === true) {
      const post = await RedditSimple.RandomPost("penis");
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "panties") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["panties", "PantiesToTheSide", "UsedPanties"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "miakhalifa") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["MiaKhalifa", "MiaKhalifaX", "miakhalifapics"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "schoolgirl") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["SchoolgirlsXXX", "SchoolGirlSkirts", "schoolnsfw"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "celebrity") {
    if (msg.channel.nsfw === true) {
      var subreddits = ["celebnsfw", "CelebNudes"];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "indian") {
    if (msg.channel.nsfw === true) {
      var subreddits = [
        "DesiBoners",
        "IndianGirls",
        "IndianPorn",
        "IndianTeens"
      ];
      var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      const post = await RedditSimple.RandomPost(sub);
      const title = post[0].data.title;
      const thumb = post[0].data.url;
      const embed = new RichEmbed()
        .setTitle(title)
        .setDescription(
          `[Image not loading? click here it might be a gif or video!](${thumb})`
        )
        .setImage(thumb)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "lanarhoades") {
    if (msg.channel.nsfw) {
      const post = await RedditSimple.RandomPost("LanaRhoades");
      const embed = new RichEmbed()
        .setTitle(post[0].data.title)
        .setImage(post[0].data.url)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "hentaisearch") {
    if (msg.channel.nsfw === true) {
      booru.posts({ tags: "pokeporn order:rank" }).then(posts => {
        // Select a random post from posts array
        const index = Math.floor(Math.random() * posts.length);
        const post = posts[index];
        // Get post's url and create a filename for it
        const url = booru.url(post.file_url);
        const name = `${post.md5}.${post.file_ext}`;
        msg.channel.send(url.href);
      });
    }
  }
  if (command === "ass") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "ass" })
        .end((err, response) => {
          const embed = new RichEmbed()
            .setTitle("Ass")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "thighs") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "thigh" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Thighs")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "anal") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "anal" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Analyzed!")
            .setImage(response.body.message)
            .setFooter(
              `PROTIP: Use lubricants while having anal sex or it could be proven deadly for you and your partner. It is way better not having it all!`
            )
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "4k") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "4k" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("4k Porn")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "pgif") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "pgif" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Porngif")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "gonewild") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "gonewild" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Gonewild!")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hentai") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hentai" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hmidriff") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hmidriff" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai Midriff")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hass") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hass" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai Ass")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hanal") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hanal" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai anal")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hthighs") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hthigh" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai Thighs")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hneko") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hneko" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai Neko")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          console.log(response);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hkitsune") {
    if (msg.channel.nsfw === true) {
      superagent
        .get("https://nekobot.xyz/api/image")
        .query({ type: "hkitsune" })
        .end((err, response) => {
          const embed = new MessageEmbed()
            .setTitle("Hentai Kitsune")
            .setImage(response.body.message)
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "boobs") {
    if (msg.channel.nsfw === true) {
      nekoapi.nsfw.boobs().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`Boobies!`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "lesbian") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.lesbian().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`lesbian`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "bjgif") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.bJ().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`Bj`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "blowjob") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.blowJob().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`Blowjob`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "pussygif") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.pussyGif().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`pussy Gif`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "feet") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.feet().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`feet`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "femdom") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.femdom().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`femdom`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "pussyart") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.pussyArt().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`pussy Art`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "smallboobs") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.smallBoobs().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`small Boobs`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "girlsolo") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.girlSolo().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`girl Solo`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "girlsologif") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.boobs().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`girl Solo Gif`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "classic") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.classic().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`classic`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "cumsluts") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.cumsluts().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`cumsluts`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "hgif") {
    if (msg.channel.nsfw === true) {
      neko.nsfw.randomHentaiGif().then(res => {
        const embed = new MessageEmbed()
          .setTitle(`Hentai Gif`)
          .setImage(res.url)
          .setColor(`#ffbf00`);
        msg.channel.send(embed);
      });
    } else {
      msg.channel.send(nsfwembed);
    }
  }
  if (command === "start") {
    const embed = new RichEmbed()
      .setAuthor(
        `Professor Oak`,
        `https://cdn.discordapp.com/attachments/716520706543714316/716569156031610882/15909137864863038580706160292221.jpg`
      )
      .setDescription(
        `**Welcome to the world of Pokémons!**\nType \`e!pick <starter name>\` to start your journey`
      )
      .addField(`Generation 1`, `Bulbasaur | Charmander | Squirtle`)
      .addField(`Generation 2`, `Chikorita | Cyndaquil | Totodile`)
      .addField(`Generation 3`, `Treecko | Torchic | Mudkip`)
      .addField(`Generation 4`, `Turtwig | Chimchar | Piplup`)
      .addField(`Generation 5`, `Snivy | Tepig | Oshawott`)
      .addField(`Generation 6`, `Chespin | Fennekin | Froakie`)
      .addField(`Generation 7`, `Rowlet | Litten | Popplio`)
      .addField(`Generation 8`, `Grookey | Scorbunny | Sobble`)
      .setImage(`https://i.imgur.com/oSHo1IZ.png`)
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
  }
  if (command === "pick") {
    const starters =
      "bulbasaur" ||
      "charmander" ||
      "squirtle" ||
      "chikorita" ||
      "cyndaquil" ||
      "totodile" ||
      "treecko" ||
      "torchic" ||
      "mudkip" ||
      "turtwig" ||
      "chimchar" ||
      "piplup" ||
      "snivy" ||
      "tepig" ||
      "oshawott" ||
      "chespin" ||
      "fennekin" ||
      "froakie" ||
      "rowlet" ||
      "litten" ||
      "popplio" ||
      "grookey" ||
      "scorbunny" ||
      "sobble";
    if (!t) {
      msg.channel.send(
        "Please type the pokemon name you would like as your starter!"
      );
    }
    if (!t === starters) {
      msg.channel.send("Please choose a valid starter!");
    }
    if (t) {
      const pick = await db.fetch(`startern${msg.member.user.id}`);
      if (!pick) {
        msg.channel.send(
          `You choosed ${t} as your starter! Type \`e!pokemons\` to see your starter!`
        );
        await db.set(`startern${msg.member.user.id}`, t);
      }
      await db.set(
        `starteriv${msg.member.user.id}`,
        `${Math.floor(Math.random() * 99) + 1}.${Math.floor(
          Math.random() * 99
        ) + 1}%`
      );
    }
  }
  if (command === "pokemons") {
    const pick = await db.fetch(`startern${msg.member.user.id}`);
    const iv = await db.fetch(`starteriv${msg.member.user.id}`);
    if (!pick) {
      msg.channel.send(
        `You haven't chosen a starter yet! Type \`e!start\` for more info!`
      );
    }
    if (pick) {
      const embed = new RichEmbed()
        .setTitle(`Your Pokemons`)
        .setDescription(`**Name:** ${pick} | **Level:** 1 | **IV:** ${iv}`)
        .setColor(`#ffbf00`);
      msg.channel.send(embed);
    }
  }
  if (command === "resetpokedata") {
    await db.delete(`startern${msg.member.user.id}`);
    await db.delete(`starteriv${msg.member.user.id}`);
    msg.channel.send(`Successfully deleted your poke data`);
  }
  if (command === "pokedex") {
    pokedex
      .name("Pikachu")
      .get()
      .then(poke => {
        console.log(poke);
      });
  }
  if (command === "chatbot") {
    if (!t) {
      const em = new RichEmbed()
        .addField("COMMAND USAGE", "`e!chatbot <text>`")
        .addField("COMMAND EXAMPLE", "`e!chatbot hello`")
        .setFooter(
          "PROTIP: If you don't want to use the command again & again, just create a channel named #chatbot where you can just type the text for response!"
        )
        .setColor(`#ffbf00`);
      msg.channel.send(em);
    } else {
      msg.channel.startTyping();
      const reply = await ai.getReply(t);
      msg.channel.stopTyping();
      var Google = ["#0F9D58", "#DB4437", "#4285F4", "#FFBF00"];
      var gcolor = Google[Math.round(Math.random() * (Google.length - 1))];
      const embed = new RichEmbed()
        .setColor(gcolor)
        .setFooter(
          `${reply}`,
          "https://cdn.discordapp.com/emojis/646994210939076618.gif"
        );
      msg.channel.send(`${msg.author}`, embed);
    }
  }
  if (command === "reversetext") {
    const text = await reverse(t);
    const embed = new RichEmbed()
      .setTitle(`Reversed Text`)
      .setDescription(text)
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
  }
  if (command === "triggered") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("triggered", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "triggered.gif"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "brilliance") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("discordhouse", {
        url: mention.user.avatarURL,
        house: "brilliance"
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "hypesquad-badge.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "bravery") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("discordhouse", {
        url: mention.user.avatarURL,
        house: "bravery"
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "hypesquad-badge.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "balance") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("discordhouse", {
        url: mention.user.avatarURL,
        house: "balance"
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "hypeesquad-badge.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "gay") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("gay", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "gay.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "missionpassed") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("missionpassed", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "missionpassed.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "brazzers") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("brazzers", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "brazzers.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "rip") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("rip", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "rip.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "thanos") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("thanos", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "thanos.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "burn") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("burn", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "burn.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "blurple") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("blurple", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "blurple.png"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "blurplegif") {
    let mention = message.mentions.members.first() || message.member;
    ameApi
      .generate("blurple", {
        url: mention.user.avatarURL
      })
      .then(image => {
        msg.channel.send({
          files: [
            {
              attachment: image,
              name: "blurple.gif"
            }
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  if (command === "phubcomment") {
    let text = args.slice(1).join(" ");
    let res = await fetch(
      encodeURI(
        `https://nekobot.xyz/api/imagegen?type=phcomment&username=${message.member.user.username}&image=${message.member.user.avatarURL}&text=${text}`
      )
    );
    let json = await res.json();
    msg.channel.send({
      files: [
        {
          attachment: json.message,
          name: "pornhub.png"
        }
      ]
    });
  }
  if (command === "electroav") {
    let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(mention.user.avatarURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/688663417887653893/ElectroBadge.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "electroav.png"
        }
      ]
    });
  }
  if (command === "coronaavgigfbjgcv") {
    let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(mention.user.avatarURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/690119126244524049/CoronaAv.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "coronavirusav.png"
        }
      ]
    });
  }
  if (command === "coronaav-greenhgfjufbjhh") {
    let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(mention.user.avatarURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/690119125929951263/CoronaAvGreen.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "coronavirusavgreen.png"
        }
      ]
    });
  }
  if (command === "coronaav-purplehufdyjbegbv") {
    let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(mention.user.avatarURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/690119124805877791/CoronaAvPurple.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "coronavirusavpurple.png"
        }
      ]
    });
  }
  if (command === "coronaav-pinkbjgfgjgcc") {
    let mention = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(mention.user.avatarURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/690119124520534035/CoronaAvPink.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "coronavirusavpink.png"
        }
      ]
    });
  }
  if (command === "profile") {
    let member = message.mentions.members.first() || message.member;
    let n = await db.fetch(`nickname${member.user.id}`);
    let b = await db.fetch(`birthday${member.user.id}`);
    let g = await db.fetch(`gender${member.user.id}`);
    let d = await db.fetch(`description${member.user.id}`);
    let r = await db.fetch(`rep${member.user.id}`);
    let canvas = Canvas.createCanvas(600, 632),
      ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/656517276832366595/703249490479677540/profile.png"
    );
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw username
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(
      canvas,
      member.user.username + `#` + member.user.discriminator,
      40
    );
    ctx.fillText(
      member.user.username + `#` + member.user.discriminator,
      canvas.width - 595,
      canvas.height - 570
    );
    // Draw reputation
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, "+696969", 35);
    ctx.textAlign = "left";
    ctx.fillText("+696969", 70, 390, 114);
    // Draw nickname
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `${n}`, 35);
    ctx.textAlign = "left";
    ctx.fillText(`${n}`, 70, 490, 220);
    // Draw gender
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `${g}`, 35);
    ctx.textAlign = "left";
    ctx.fillText(`${g}`, 70, 595, 220);
    // Draw date of birth
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `${b}`, 35);
    ctx.textAlign = "middle";
    ctx.fillText(`${b}`, 360, 390, 180);
    // Draw married to
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, "None Yet", 35);
    ctx.textAlign = "left";
    ctx.fillText("Feature Not Available Yet", 360, 490, 180);
    // Draw desc
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `${d}`, 28);
    ctx.textAlign = "left";
    wrapText(ctx, `${d}`, 328, 588, 208, 14);

    // Pick up the pen
    ctx.beginPath();
    //Define Stroke Line
    ctx.lineWidth = 10;
    //Define Stroke Style
    ctx.strokeStyle = "#000000";
    // Start the arc to form a circle
    ctx.arc(292, 235, 77, 0, Math.PI * 2, true);
    // Draw Stroke
    ctx.stroke();
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    let avatar = await Canvas.loadImage(member.user.avatarURL);
    // Move the image downwards vertically and constrain its height to 200, so it"s a square
    ctx.drawImage(avatar, 214, 159, 154, 154);
    msg.channel.send({
      files: [
        {
          attachment: canvas.toBuffer(),
          name: "profile.png"
        }
      ]
    });
  }
  if (command === "helpprofile") {
    const embed = new RichEmbed()
      .setAuthor(`Instructions To Set Profile`, msg.member.user.avatarURL)
      .addField(`Nickname`, "`e!setnickname <arg>` e.g. Adib")
      .addField(
        `Gender`,
        "`e!setgender <male/female/transgender/non-binary/other>` e.g. Male"
      )
      .addField(`Date Of Birth`, "`e!setbirthday <d, m>` e.g 4th April")
      .addField(`Description`, "`e!setdescription <args>` e.g. I made this bot")
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
  }
  if (command === "define") {
    if (msg.channel.nsfw === true) {
      let worder = args.slice(1).join(" ");
      if (!worder) {
        return msg.channel.send("Specify a word");
      }
      let defin = await ud(worder).catch(err => {
        message.channel.send("Word not found");
        return;
      });
      const embed = new MessageEmbed()
        .setTitle(defin.word)
        .setAuthor(defin.author)
        .setURL(defin.urbanURL)
        .addField("Definition", "```" + defin.definition + "```")
        .addField("Example", "```" + defin.example + "```")
        .setFooter(`👍` + defin.thumbsUp + ` | ` + `👎` + defin.thumbsDown)
        .setColor(`#FFBF00`);
      message.channel.send(embed);
    } else msg.channel.send(nsfwembed);
  }
  if (command === "math") {
    let resp;
    try {
      resp = math.evaluate(args.slice(1).join(""));
    } catch (e) {
      throw e;
    }
    const embed = new MessageEmbed()
      .setDescription(
        "🔢  |  **" +
          message.member.user.username +
          "**, your expression evaluates to `" +
          resp +
          "`"
      )
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
  }
  if (command === "avtest") {
    msg.channel.send(`${msg.member.user.avatarURL}`);
  }
  if (command === "setuplog") {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.channel.send(`You must be a admin to use this command! `);
    let role = message.guild.roles.find("name", "@everyone");
    message.guild.createChannel("⚡electro-logs", "text").then(c => {
      c.overwritePermissions(role, { READ_MESSAGES: false });
      message.channel.send(`Successfully created <#${c.id}>.`);
    });
  }
  if (command === "membercountchannel") {
    let permission = message.member.hasPermission("ADMINISTRATOR");

    if (!permission)
      return message.channel.send(
        "You are missing the permission `ADMINISTRATOR`"
      );

    let cArgs = message.mentions.channels.first();

    if (!cArgs) return message.channel.send("You must mention a channel!");
    try {
      client.guilds
        .get(message.channel.guild.id)
        .channels.get(cArgs.id)
        .send("Membercount Channel Set!");
      await db.set(`mc${message.channel.guild.id}`, cArgs.id);
      return;
    } catch (e) {
      return message.channel.send(
        "I'm missing permission or channel doesn't exists!"
      );
    }
  }
  if (command === "joinchannel") {
    let permission = message.member.hasPermission("ADMINISTRATOR");

    if (!permission)
      return message.channel.send(
        "You are missing the permission `ADMINISTRATOR`"
      );

    let cArgs = message.mentions.channels.first();

    if (!cArgs)
      return message.channel.send(
        "You must specify a valid id for the welcome channel!"
      );

    try {
      client.guilds
        .get(message.channel.guild.id)
        .channels.get(cArgs.id)
        .send("Welcome channel set!");

      await db.set(`jc${message.channel.guild.id}`, cArgs.id);

      message.channel.send(
        "You have successfully set the welcome channel to <#" + cArgs.id + ">"
      );
      return;
    } catch (e) {
      return message.channel.send(
        "Error: missing permissions or channel doesn't exist"
      );
    }
  }
  if (command === "leavechannel") {
    let permission = message.member.hasPermission("ADMINISTRATOR");

    if (!permission)
      return message.channel.send(
        "You are missing the permission `ADMINISTRATOR`"
      );

    let cArgs = message.mentions.channels.first();

    if (!cArgs)
      return message.channel.send(
        "You must specify a valid id for the leave channel!"
      );

    try {
      client.guilds
        .get(message.channel.guild.id)
        .channels.get(cArgs.id)
        .send("Leave channel set!");

      await db.set(`lc${message.channel.guild.id}`, cArgs.id);

      message.channel.send(
        "You have successfully set the leave channel to <#" + cArgs.id + ">"
      );
      return;
    } catch (e) {
      return message.channel.send(
        "Error: missing permissions or channel doesn't exist"
      );
    }
  }
  if (command === "testwelcomer") {
    let permission = message.member.hasPermission("ADMINISTRATOR");
    if (!permission)
      return msg.channel.send(
        "**<a:ElectroFail:656772856184832025> | YOU NEED THE** `ADMINISTRATOR` **PERMISSION IN ORDER TO USE THIS COMMAND!**"
      );
    await client.emit("guildMemberAdd", msg.member);
    await client.emit("guildMemberRemove", msg.member);
    let c = await db.fetch(`jc${message.channel.guild.id}`);
    let d = await db.fetch(`lc${message.channel.guild.id}`);
    msg.channel.send(`**Join channel** - <#${c}>`);
    msg.channel.send(`**Leave channel** - <#${d}>`);
  }
  if (command === "note") {
    const note = t;
    if (!note)
      return msg.channel.send(
        `<a:ElectroFail:656772856184832025> **| PLEASE SPECIFY WHAT TO NOTE!**`
      );
    await db.set(`note${msg.member.user.id}`, note);
    msg.channel.send(`Noted!`);
  }
  if (command === "getnote") {
    const n = await db.fetch(`note${msg.member.user.id}`);
    const embed = new MessageEmbed()
      .setTitle(`NOTE`)
      .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
      .setDescription(`${n}`);
    msg.channel.send(`**${msg.member.user.username}'s note**: ${n}`);
  }
  if (command === "snipe") {
    const s = await db.fetch(`snipe${msg.channel.id}`);
    const a = await db.fetch(`snipeauthor${msg.channel.id}`);
    const t = await db.fetch(`snipetime${msg.channel.id}`);
    const av = await db.fetch(`snipeauthorav${msg.channel.id}`);
    const embed = new RichEmbed()
      .setAuthor(`${a}`, `${av}`)
      .setDescription(`${s}`)
      .setFooter(`${t}`)
      .setColor(`#ffbf00`);
    msg.channel.send(embed);
  }
  if (command === "setnickname") {
    const note = t;
    if (!note)
      return msg.channel.send(
        `<a:ElectroFail:656772856184832025> **| PLEASE SPECIFY WHAT TO SET AS YOUR NICKNAME!**`
      );
    await db.set(`nickname${msg.member.user.id}`, note);
    msg.channel.send(`Profile Updated!`);
  }
  if (command === "setbirthday") {
    const note = t;
    if (!note)
      return msg.channel.send(
        `<a:ElectroFail:656772856184832025> **| PLEASE SPECIFY WHEN IS YOUR BIRTHDAY!** E.g. 4Th April`
      );
    await db.set(`birthday${msg.member.user.id}`, note);
    msg.channel.send(`Profile Updated!`);
  }
  if (command === "setgender") {
    const note = t;
    if (!note)
      return msg.channel.send(
        `<a:ElectroFail:656772856184832025> **| PLEASE SPECIFY WHICH GENDER ARE YOU!** E. g. Male, Female, Transgender, Non-binary or others.`
      );
    await db.set(`gender${msg.member.user.id}`, note);
    msg.channel.send(`Profile Updated!`);
  }
  if (command === "setdescription") {
    const note = t;
    if (!note)
      return msg.channel.send(
        `<a:ElectroFail:656772856184832025> **| PLEASE SPECIFY WHAT SHOULD BE YOUR DESCRIPTION!**`
      );
    await db.set(`description${msg.member.user.id}`, note);
    msg.channel.send(`Profile Updated!`);
  }
  /*if (command === "rep") {
    let user = msg.mentions.members.first();
    if (!user === msg.member) {
      let timeout = 43200000; // 12 hours in milliseconds, change if you'd like.
      let amount = 1;
      // random amount: Math.floor(Math.random() * 1000) + 1;

      let daily = await db.fetch(`reptime${message.author.id}`);

      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(
          `You already gave your reputation to someone in last 12 hours, try again in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`
        );
      } else {
        let embed = new RichEmbed()
          .setColor(`#ffbf00`)
          .setDescription(
            `🆙 | **${msg.member} has given a reputation point!** `
          );
        msg.channel.send(embed);
        await db.add(`rep${message.author.id}`, amount);
        await db.set(`reptime_${message.author.id}`, Date.now());
      }
    }
  }*/
  if (command === "play") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> | **PLEASE JOIN A VC TO BE ABLE TO USE THIS COMMAND!**"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> | **I NEED THE `CONNECT` PERMISSION IN THAT VC TO WORK!**"
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> | **I NEED THE `SPEAK` PERMISSION IN THAT VC TO WORK!**"
      );
    }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(
        `✅ Playlist: **${playlist.title}** has been added to the queue!`
      );
      return msg.channel.send(
        `✅ Playlist: **${playlist.title}** has been added to the queue!`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          const embed = new MessageEmbed()
            .setTitle(`SONG SELECTION`)
            .setDescription(
              `${videos
                .map(video2 => `**${++index} -** ${video2.title}`)
                .join("\n")}`
            )
            .setFooter(
              `Please provide a value to select one of the search results ranging from 1-10.`
            )
            .setColor(`#ffbf00`);
          msg.channel.send(embed);
          // eslint-disable-next-line max-depth
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              "<a:ElectroFail:656772856184832025> | **SONG SELECTION TIMED OUT, CANCELLING SONG SELECTION!**"
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            "<a:ElectroFail:656772856184832025> | **I COULD NOT OBTAIN ANY SEARCH RESULTS, PLEASE PROVIDE VALID SONG NAMES!**"
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "skip") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> | **PLEASE JOIN A VC TO BE ABLE TO USE THIS COMMAND!**"
      );
    if (!serverQueue)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> | **NOTHING IS BEEN PLAYED RIGHT NOW!**"
      );
    serverQueue.connection.dispatcher.end(
      "<a:ElectroCheck:709464171825201315> **THIS SONG HAS BEEN SUCCESSFULLY SKIPPED!**"
    );
    return undefined;
  } else if (command === "stop") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> **PLEASE JOIN A VC TO BE ABLE TO USE THIS COMMAND!**"
      );
    if (!serverQueue)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> **NOTHING IS BEEN PLAYED RIGHT NOW!**"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(
      "<a:ElectroCheck:709464171825201315> **THIS SONG HAS BEEN SUCCESSFULLY STOPPED!**"
    );
    return undefined;
  } else if (command === "volume") {
    if (!msg.member.voiceChannel)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> **PLEASE JOIN A VC TO BE ABLE TO USE THIS COMMAND!**"
      );
    if (!serverQueue)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> **NOTHING IS BEEN PLAYED RIGHT NOW!**"
      );
    if (!args[1])
      return msg.channel.send(
        `The current volume is: **${serverQueue.volume * 20}**`
      );
    serverQueue.volume = args[1] / 20;
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
    return msg.channel.send(
      `<a:ElectroCheck:709464171825201315> **THE VOLUME HAS BEEN CHANGED TO ${
        args[1]
      }!**`
    );
  } else if (command === "np") {
    if (!serverQueue)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> **NOTHING IS BEEN PLAYED RIGHT NOW!**"
      );
    return msg.channel.send(
      `🎶 Now playing: **${serverQueue.songs[0].title}**`
    );
  } else if (command === "queue") {
    if (!serverQueue)
      return msg.channel.send(
        "<a:ElectroFail:656772856184832025> **NOTHING IS BEEN PLAYED RIGHT NOW!**"
      );
    return msg.channel.send(`
__**SONG QUEUE:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

**Now playing:** ${serverQueue.songs[0].title}
		`);
  } else if (command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send(
        "<a:ElectroCheck:709464171825201315> **THIS SONG HAS BEEN SUCCESSFULLY PAUSED!**"
      );
    }
    return msg.channel.send(
      "<a:ElectroFail:656772856184832025> **NOTHING IS BEEN PLAYED RIGHT NOW!**"
    );
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send(
        "<a:ElectroCheck:709464171825201315> **THIS SONG HAS BEEN SUCCESSFULLY RESUMED!**"
      );
    }
    return msg.channel.send(
      "<a:ElectroFail:656772856184832025> **NOTHING IS BEEN PLAYED RIGHT NOW!**"
    );
  }

  return undefined;
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  db.set(`snipe${message.channel.id}`, message.content);
  db.set(
    `snipeauthor${message.channel.id}`,
    `${message.member.user.username}#${message.member.user.discriminator}`
  );
  db.set(`snipetime${message.channel.id}`, `${message.createdAt}`);
  db.set(
    `snipeauthorav${message.channel.id}`,
    `${message.member.user.avatarURL}`
  );
});

client.on("guildMemberAdd", async member => {
  let wChan = await db.fetch(`jc${member.guild.id}`);

  if (wChan == null) return;

  if (!wChan) return;
  try {
    // Background language
    let canvas = Canvas.createCanvas(1024, 450),
      ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://cdn.glitch.com/5c8b778c-3aaa-4253-b149-acb8c9267727%2FWELCOME.png?v=1585391650755"
    );
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw username
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, member.user.username, 48);
    ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);
    // Draw server name
    ctx.font = applyText(canvas, "text", 53);
    ctx.fillText("TO " + member.guild, canvas.width - 690, canvas.height - 65);
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

    let avatar = await Canvas.loadImage(member.user.avatarURL);
    // Move the image downwards vertically and constrain its height to 200, so it"s a square
    ctx.drawImage(avatar, 45, 90, 270, 270);
    member.guild.channels.get(wChan).send(`${member} JUST JOINED THE SERVER!`, {
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
  let mChan = await db.fetch(`mc${member.guild.id}`);
  const c = member.guild.channels.find("id", `${mChan}`);
  c.setName(`membercount-${member.guild.memberCount}`);
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
      "https://cdn.glitch.com/5c8b778c-3aaa-4253-b149-acb8c9267727%2FGOODBYE.png?v=1585391659519"
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

    let avatar = await Canvas.loadImage(member.user.avatarURL);
    // Move the image downwards vertically and constrain its height to 200, so it"s a square
    ctx.drawImage(avatar, 45, 90, 270, 270);
    member.guild.channels.get(lChan).send(
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
  let mChan = await db.fetch(`mc${member.guild.id}`);
  const c = member.guild.channels.find("id", `${mChan}`);
  c.setName(`membercount-${member.guild.memberCount}`);
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: video.thumbnails.maxres.url,
    min: video.duration.minutes,
    sec: video.duration.seconds,
    artist: video.channel.title
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return msg.channel.send(
        `<a:ElectroCheck:709464171825201315> **${song.title}** HAS BEEN ADDED TO THE QUEUE!`
      );
  }
  return undefined;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function wrapText(context, text, x, y, maxWidth, fontSize, fontFace) {
  var words = text.split(" ");
  var line = "";
  var lineHeight = fontSize;

  context.font = fontSize + "px " + fontFace;

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth) {
      context.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
  return y;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  const embed = new RichEmbed()
    .setDescription(
      `<a:ElectroCheck:709464171825201315> Started Playing: **${song.title}**`
    )
    .setImage(song.thumbnail)
    .setFooter(`DURATION: ${song.min}:${song.sec} | ARTIST: ${song.artist}`)
    .setColor(`#ffbf00`);

  serverQueue.textChannel.send(embed);
}

client.login(process.env.BOT_TOKEN);
