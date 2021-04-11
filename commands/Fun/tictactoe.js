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
    usage: "ttt",
    run: async(client, message, args) => {
      const member = message.mentions.members.first()
      if(!member) return message.channel.send(`${fail} **PLEASE MENTION A VALID USER TO PLAY TICTACTOE WITH!**`);
      //if(member.user.id == message.author.id) return message.channel.send(`${fail} **YOU CAN\'T PLAY TICTACTOE WITH YOURSELF!**`)

new tictactoe({
    message: message,
    player_two: member,
}); 

        }
    }  
