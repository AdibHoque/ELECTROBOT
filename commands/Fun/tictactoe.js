const {Discord, MessageEmbed} = require("discord.js");
const db = require("quick.db")
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

module.exports = {
    name: "tictactoe",
    category: "Fun",
    description: "Play tictactoe",
    aliases: ["ttt"],
    usage: "ttt",
    run: async(client, message, args) => {
return; 
/*
       if(!message.author.id == "496978159724396545") return; 
        let a = '🇦'
        let b = '🇧'
        let c = '🇨'
        let d = '🇩'
        let e = '🇪'
        let f = '🇫'
        let g = '🇬'
        let h = '🇭'
        let i = '🇮'
        const user1 = message.author;
        const user2 =  message.mentions.users.first() || await client.users.fetch(args[0])
        
        message.channel.send(`${user1.tag} sent a open challenge of a tictactoe game! Type \`Join\` within 30 seconds to accept the challenge!`);
	message.channel.awaitMessages(m => m.author.bot == false, {
		max: 1,
		time: 30000,
		errors: ['time'],
	}).then(async collected => {
		if (!collected.first()) return;
		if (collected.first().content.toLowerCase() == 'join') {
            message.channel.send(`Arrange 3 of your tile in a line within the board to win!\n🇦 🇧 🇨\n🇩 🇪 🇫\n🇬 🇭 🇮\n\n${user1.username}: ❌\n${collected.first().author.username}: ⭕\It\'s your turn <@${message.author.id}>`)
            //db.set(`ttt${user1.id}${collected.first().author.id}${message.channel.id}`, {})
              }
        })
       })*/
        }
    }  
