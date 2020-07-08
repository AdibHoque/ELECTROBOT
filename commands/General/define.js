const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const ud = require("relevant-urban");
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
    name: "define",
    category: "General",
    description: "Fetch definitions from Urban-Dictionary!",
    aliases: ["urban", "df", "ud"],
    usage: "define <word>",
    run: async(client, message, args) => {
        let worder = args;
    if (!worder) {
      return message.channel.send("Specify a word to define!");
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
  }
}
  /*if (!args.length) {
    return message.channel.send('You need to supply a search term!');
  }

	const query = querystring.stringify({ term: args.join(' ') });

  const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
  if (!list.length) {
	return message.channel.send(`No results found for **${args.join(' ')}**.`);
} 
  console.log(list)
  message.channel.send(list[0].definition).then((msg) => { msg.react('⏩')
  const filter = (reaction, user) => {
    return ['⏩', '👎'].includes(reaction.emoji.name)
};

message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '⏩') {
            message.channel.send(list[1].definition) 
        }
        else {
            message.reply('.');
        }
    })
    .catch(collected => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
    });
  })
 
} 
    }*/