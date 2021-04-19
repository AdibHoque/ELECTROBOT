const {Discord, MessageEmbed} = require("discord.js");
const db = require("quick.db")
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const {tictactoe} = require("reconlx")

module.exports = {
    name: "tictactoe",
    category: "Fun",
    description: "Play tictactoe",
    aliases: ["ttt"],
    usage: "tictactoe <@User>",
    run: async(client, message, args) => {
      const member = message.mentions.members.first()
      if(!member) {
message.channel.send(`**Play a TicTacToe match**\nArrange 3 of your tile in a line within the board!\n\n☑  ${message.author.username}
Needs at least 1 more player\n\nType \`${prefix}play\` to play against them!`)
message.channel.awaitMessages(m => !m.author.bot && m.content == prefix+'play', {
		max: 1,
		time: 30000,
		errors: ['time'],
	}).then(async collected => {
		if (!collected.first()) return;
		if (collected.first().content.toLowerCase() == prefix+'play') {
return new tictactoe({
    message: collected.first((,
    player_two: message.member,
}); 
}

})
}

new tictactoe({
    message: message,
    player_two: member,
}); 

        }
    }  
