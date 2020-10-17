const {Discord, MessageEmbed} = require("discord.js");
const {get} = require("request-promise-native");
const ascii = require("ascii-table") 

String.prototype.capitalize = function() {
   // return this.charAt(0).toUpperCase() + this.slice(1);
  var separateWord = this.toLowerCase().split(' ');
   for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
   }
   return separateWord.join(' '); 
}  

module.exports = {
    name: "moveset",
    category: "General",
    description: "Learn about moveset of a pokemon!",
    aliases: ["moves"],
    usage: "moveset <pokemon name>",
    run: async(client, message, args) => {
 const table = new ascii(args[0].replace("-"," ").capitalize()+"'s Moves")
 table.setHeading("Move","Level")
      const mov = []
let options = {
url: "https://pokeapi.co/api/v2/pokemon/"+args[0].toLowerCase()+"/",
json: true
}
const body = await get(options)
body.moves.forEach(m => {
if(m.version_group_details[0].move_learn_method.name === "level-up") {
  table.addRow(m.move.name.replace("-"," ").capitalize(), m.version_group_details[0].level_learned_at) 
}})
  message.channel.send("```"+table.toString()+"```")
        }
    }  