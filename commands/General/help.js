const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const mongoose = require("mongoose");
const pr = require("./../../Mongodb/prefix")

mongoose.connect("mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  name: "help",
  category: "General",
  description: "Returns all commands, or one specific command info",
  usage: "help [command | alias]",
  run: async (client, message, args) => {
  const res =  await pr.findOne({name: "prefix", preid: message.guild.id})
  let prefix = res ? res.prefix : "e!";
    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      // Otherwise send all the commands available
      // Without the cmd info
     /* const embed = new MessageEmbed()
        .setAuthor(`ELECTRO`, `https://cdn.discordapp.com/attachments/656517276832366595/656519678499487745/ELECTRO.png`)
        .setDescription(`**[HELP MENU](https://discord.gg/kuWVFpR)**\n● To get detailed help on a command, type \`${prefix}help <command name>\`!`)
        .addField(`<:ElectroGeneralBadge:680783367247364097> GENERAL COMMANDS - (23)`, "`ping`, `userinfo`, `serverinfo`, `ownerinfo`, `avatar`, `membercount`, `define`, `snipe`, `math`, `invite`, `upvote`, `pokemon`, `shinypokemon`, `pokefuse`, `8ball`, `electroav`, `brilliance`, `bravery`, `balance`, `motivation`, `revive`, `reversetext`, `chatbot`")
        .addField(`<:ElectroModerationBadge:680783390999314466> MODERATION COMMANDS - (18)`, "`kick`, `ban`, `setnick`, `role`, `say`, `embed`, `DM`, `english`, `rolecolor`, `lockdown`, `unlock`, `menro`, `mute`, `unmute`, `joinchannel`, `leavechannel`, `testwelcomer`, `poll`")
        .addField(`<:ElectroFunBadge:680783413065941002> FUN COMMANDS - (26)`, "`triggered`, `brazzers`, `burn`, `gay`, `missionpassed`, `thanos`, `rip`, `meme`, `pat`, `love`, `slap`, `kiss`, `hug`, `cuddle`, `spank`, `tweet`, `phubcomment`, `howgay`, `whowouldwin`, `captcha`, `magik`, `deepfry`,`iphonex`, `threats`, `clyde`, `trash`")
        .addField(`<:ElectroEconomyBadge:752834145159348294> ECONOMY COMMANDS - (13)`, "`balance`, `daily`, `rep`, `beg`, `rob`, `postmeme`, `marry`, `divorce`, `gender`, `checklist`, `leaderboard`, `pay`, `profile`")
        .addField(`<:ElectroNSFWBadge:680783452563439774> NSFW COMMANDS - (41)`, "Please type `"+prefix+"nsfw` to view the NSFW commands!")
        .addField(`<:ElectroBookmark:668018207549816833> USEFUL LINKS:`, `[ADD BOT](https://discordapp.com/oauth2/authorize?client_id=629323586930212884&permissions=2146827775&redirect_uri=https%3A%2F%2Fdiscord.gg%2dAggRh9&response_type=code&scope=guilds.join%20bot) | [JOIN GUILD](https://discord.gg/dAggRh9) | [VOTE](https://discordbots.org/bot/629323586930212884/vote) | [WEBSITE](https://electro-bot.glitch.me/)`)
        .setFooter(`© 2020 ELECTRO, Inc.`)
        .setColor("#ffbf00")
       // .setImage(`https://cdn.discordapp.com/attachments/656517276832366595/679975327698649109/ElectroCommandsCategories.gif`)
      message.channel.send(embed);*/
      const genArr = [],
		    modArr = [],
			funArr = [],
			ecoArr = [],
      nsfwArr = [];
		client.commands.filter((cmd) => cmd.category === 'General').forEach((cmd) => genArr.push(cmd.name));
		client.commands.filter((cmd) => cmd.category === 'Moderation').forEach((cmd) => modArr.push(cmd.name));
		client.commands.filter((cmd) => cmd.category === 'Economy').forEach((cmd) => ecoArr.push(cmd.name));
		client.commands.filter((cmd) => cmd.category === 'Fun').forEach((cmd) => funArr.push(cmd.name)); 
    client.commands.filter((cmd) => cmd.category === 'NSFW').forEach((cmd) => nsfwArr.push(cmd.name));
      const embed = new MessageEmbed()
        .setAuthor(`ELECTRO`, `https://cdn.discordapp.com/attachments/656517276832366595/656519678499487745/ELECTRO.png`)
        .setDescription(`**[HELP MENU](https://discord.gg/kuWVFpR)**\n● To get detailed help on a command, type \`${prefix}help <command name>\`!`)
        .addField(`<:ElectroGeneralBadge:680783367247364097> GENERAL COMMANDS - (${genArr.length})`, `\`${genArr.join('`, `')}\`` )
        .addField(`<:ElectroModerationBadge:680783390999314466> MODERATION COMMANDS - (${modArr.length})`, `\`${modArr.join('`, `')}\`` )
        .addField(`<:ElectroFunBadge:680783413065941002> FUN COMMANDS - (${funArr.length})`, `\`${funArr.join('`, `')}\`` )
        .addField(`<:ElectroEconomyBadge:752834145159348294> ECONOMY COMMANDS - (${ecoArr.length})`, `\`${ecoArr.join('`, `')}\``)
        .addField(`<:ElectroNSFWBadge:680783452563439774> NSFW COMMANDS - (${nsfwArr.length})`, "NSFW commands are hidden!\nType `"+prefix+"NSFW` if you're willing to view them!")
        .addField(`<:ElectroBookmark:668018207549816833> USEFUL LINKS:`, `[ADD BOT](https://discordapp.com/oauth2/authorize?client_id=629323586930212884&permissions=2146827775&redirect_uri=https%3A%2F%2Fdiscord.gg%2dAggRh9&response_type=code&scope=guilds.join%20bot) | [JOIN GUILD](https://discord.gg/dAggRh9) | [VOTE](https://discordbots.org/bot/629323586930212884/vote) | [WEBSITE](https://electro-bot.glitch.me/)`)
        .setFooter(`© 2020 ELECTRO, Inc.`)
        .setColor("#ffbf00")
       // .setImage(`https://cdn.discordapp.com/attachments/656517276832366595/679975327698649109/ElectroCommandsCategories.gif`) 
      message.channel.send(embed);
    }
  }
};

function getAll(client, message) {
  const embed = new MessageEmbed().setColor("#ffbf00");

  // Map all the commands
  // with the specific category
  const commands = category => {
    return client.commands
      .filter(cmd => cmd.category === category)
      .map(cmd => `- \`${cmd.name}\``)
      .join("\n");
  };

  // Map all the categories
  const info = client.categories
    .map(
      cat =>
        stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(
          cat
        )}`
    )
    .reduce((string, category) => string + "\n" + category);

  return message.channel.send(embed.setDescription(info));
}

async function getCMD(client, message, input) {
  const embed = new MessageEmbed();

  // Get the cmd by the name or alias
  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No information found for command **${input.toLowerCase()}**`;

  // If no cmd is found, send not found embed
  if (!cmd) {
    return message.channel.send(embed.setColor("#ffbf00").setDescription(info));
  }

  // Add all cmd info to the embed
  if (cmd.name) info = `<:Name:722467759161737226> **Name**: \`${cmd.name}\``;
  if (cmd.aliases)
    info += `\n<:Aliases:722467861590704239> **Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
  if (cmd.description) info += `\n<:Description:722467727700394072> **Description**: \`${cmd.description}\``;
  if (cmd.usage) {
  const res = await pr.findOne({name: "prefix", preid: message.guild.id})
  let prefix = res ? res.prefix : "e!";
    info += `\n<:Usage:722468096362676234> **Usage**: \`${prefix}${cmd.usage}\``;
  }

  return message.channel.send(embed.setFooter(`<> = required | [] = optional`).setColor("#ffbf00").setAuthor(`Detailed Help`).setDescription(info));
} 