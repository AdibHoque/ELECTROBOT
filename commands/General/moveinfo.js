const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
//const Pokedex = require('pokedex.js')
//const pokedex = new Pokedex('en')
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const { get } = require('request-promise-native')

module.exports = {
    name: "moveinfo",
    category: "General",
    description: "Get information about a pokémon move!",
    aliases: [],
    usage: "moveinfo <Name | ID>",
    run: async(client, message, args) => {
        const msg = message 
        //console.log(pokedex.name('Pikachu').get())
// [{"id":"25","localId":{"galar":"194"},"name":"Pikachu","type":["Electric"],"ability":[{"name":"Static","hidden":false},{"name":"Lightning Rod","hidden":true}],"eggGroup":["Field","Fairy"],"baseStats":{"H":"35","A":"55","B":"40","C":"50","D":"50","S":"90"},"generation":1}]
function getlength(number) {
      return number.toString().length;
    }
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    const arg = message.content.split(" "); 
    const movename = args.join("-")
    
    //let args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(!movename) return message.channel.send("Please specify a move name or ID!")
    const options = {
      url: `https://pokeapi.co/api/v2/move/${movename.toLowerCase()}`,
      json: true
    };
      get(options).then(async body => { 
    const embed = new MessageEmbed()
    .setTitle(`#${body.id} - ${movename.capitalize().replace("-", " ")}`)
    .setDescription(body.effect_entries[0].effect)
    .addField("Power",body.power ? body.power : 0,true)
    .addField("Accuracy",body.accuracy ? body.accuracy : 0,true)
    .addField("Type",body.type.name.capitalize())
    .addField("Damage Class",body.damage_class.name.capitalize())
   console.log(body.power)
    message.channel.send(embed)
    }).catch(err => console.log(err))
        }
    } 