const Discord = require("discord.js");
const { version } = require("discord.js");
let os = require('os')
const ms = require("ms")
const v = require("./../../package.json");


module.exports = {
    name: "botinfo",
    category: "General",
    description: "See the info of the bot!",
    aliases: ["info"],
    Usage: "botinfo",
    run: async(client, message, args) => {
           const embedStats = new Discord.MessageEmbed()
            .setAuthor(client.user.username+` `+v.version)
            .setColor("#FFBF00")
            .addField(" Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("🛠 Developer", `ADIB HOQUE ⚒#8801`, true)
            .addField("👤 Users", `${client.users.cache.size}`, true)
            .addField("🏠 Servers", `${client.guilds.cache.size}`, true)
            .addField("#️⃣ Channels ", `${client.channels.cache.size}`, true)
            .addField("📚 Library", `Discord.js v${version}`, true)
            .addField("🗒 Node", `${process.version}`, true)
            .addField("📊 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("🔖 Arch", `\`${os.arch()}\``, true)
            .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
            .addField("🤖 API Latency", `${client.ws.ping}ms`)  
        message.channel.send(embedStats)
    }
} 
