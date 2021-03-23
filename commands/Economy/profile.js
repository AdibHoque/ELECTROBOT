const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const Canvas = require("canvas");
const mongoose = require('mongoose') ;
mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const u = require("./../../Mongodb/user")

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};

module.exports = {
    name: "profile",
    category: "Economy",
    description: "Check your profile",
    aliases: ["pf"],
    usage: "profile [@user]",
    run: async(client, message, args) => {
        const msg = message 
        const member = message.mentions.members.first() || message.member;
      const userResult = await u.findOne({name: "users", preid: member.user.id})
if(!userResult) {
return message.channel.send("You/they don't have a economy account yet, get started by doing \`${prefix}daily\`.")
}
        const canvas = Canvas.createCanvas(600, 632);
        const ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://cdn.glitch.com/7be22abc-1b5d-415c-ba45-ac77001d72be%2Fnpf.jpg?v=1596983584306"
    );
      const rep = userResult.rep ? userResult.rep : 0;
      const bal = userResult.balance ? userResult.balance : 0;
      const g = userResult.gender ? userResult.gender : "Not Set";
      let m = "Unmarried"
      if(userResult.marriedto) m = client.users.cache.get(userResult.marriedto) ? client.users.cache.get(userResult.marriedto).tag : userResult.marriedtoname;
      //if(!client.users.cache.get(userResult.marriedto)) m = userResult.marriedtoname;
      if(!userResult.marriedtoname) m = "Unmarried";
      const cu = userResult.cmdused ? userResult.cmdused+" Times" : "0 Times";
      const ds = userResult.dailystreak ? userResult.dailystreak+" Days" : "0 Days";
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      let developer = await Canvas.loadImage("https://cdn.discordapp.com/attachments/656517276832366595/747842027802198208/DevAddon.png");
      if(member.user.id == "496978159724396545") ctx.drawImage(developer, 0,0, canvas.width,canvas.height);
    // Draw username
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(
      canvas,
      member.user.username + `#` + member.user.discriminator,
      38
    );
    ctx.fillText(
      member.user.username + `#` + member.user.discriminator,
      canvas.width - 595,
      canvas.height - 570
    );
    // Draw reputation
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, "★"+userResult.rep, 35);
    ctx.textAlign = "middle";
    ctx.fillText("★"+userResult.rep, 50, 350, 114);
    // Draw balance
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `$${userResult.balance}`, 35);
    ctx.textAlign = "middle";
    ctx.fillText(`$${userResult.balance}`, 50, 470, 220);
    // Draw marriedto
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `${m}`, 35);
    ctx.textAlign = "middle";
    ctx.fillText(`${m}`, 370, 350, 220);
    // Draw gender
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `${g}`, 35);
    ctx.textAlign = "middle";
    ctx.fillText(`${g}`, 370, 470, 180);
    // Draw commands used
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, "Commands Used: "+cu, 32);
    ctx.textAlign = "left";
    ctx.fillText("Commands Used: "+cu, 16, 573, 300);
    // Draw streak
    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, `Daily Streak: ${ds}`, 32);
    ctx.textAlign = "left";
    ctx.fillText(`Daily Streak: ${ds}`, 16, 605, 300)

    // Pick up the pen
    ctx.beginPath();
    //Define Stroke Line
    ctx.lineWidth = 10;
    //Define Stroke Style
    ctx.strokeStyle = "#ffffff";
    // Start the arc to form a circle
    ctx.arc(292, 235, 77, 0, Math.PI * 2, true);
    // Draw Stroke
    ctx.stroke();
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    let avatar = await Canvas.loadImage(member.user.avatarURL({format:"png",dynamic:false,size:256}));
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
    } 
