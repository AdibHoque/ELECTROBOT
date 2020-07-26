const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
//const Pokedex = require('pokedex.js')
//const pokedex = new Pokedex('en')
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const { get } = require('request-promise-native')

module.exports = {
    name: "pokedex",
    category: "General",
    description: "Get information about a pokémon!",
    aliases: ["dex", "pdex"],
    usage: "pokedex <Name | ID>",
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
    
    //let args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(!arg[1]) return message.channel.send("Please specify a pokemon!")
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${arg[1].toLowerCase()}`,
      json: true
    };
    if(arg[1].toLowerCase() === "giratina") options.url = "https://pokeapi.co/api/v2/pokemon/giratina-altered"
    if(arg[1].toLowerCase() === "deoxys") options.url = "https://pokeapi.co/api/v2/pokemon/deoxys-normal"
    get(options).then(async body => { 
     /* let stats = Math.round(
        (body.stats[5].base_stat +
          body.stats[4].base_stat +
          body.stats[3].base_stat +
          body.stats[2].base_stat +
          body.stats[1].base_stat +
          body.stats[0].base_stat) 
      );*/
      let Embed = new RichEmbed()
      .setAuthor(`Professor Oak`)
      .setTitle(`#${body.id} - ${body.name.capitalize()}`)
      if(body.types[1] != null) {
        Embed.addField(`Types`,`${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}`)
      }
      else{
        Embed.addField(`Type`,`${body.types[0].type.name.capitalize()}`)
      } 
      Embed.addField(`Base Stats`,`**HP**: ${body.stats[0].base_stat}\n**Attack**: ${body.stats[1].base_stat}\n**Defense**: ${body.stats[2].base_stat}\n**Sp. Atk**: ${body.stats[3].base_stat}\n**Sp. Def**: ${body.stats[4].base_stat}\n**Speed**: ${body.stats[5].base_stat}`)
      Embed.addField(`Weight:`, body.weight/10+"kg", true) 
      Embed.addField(`Height:`, body.height/10+"m", true) 
      if(body.abilities.length === 1) {
        Embed.addField(`Ability:`,body.abilities[0].ability.name.capitalize())
      }
      if(body.abilities.length === 2) {
        Embed.addField(`Abilities:`,body.abilities[0].ability.name.capitalize()+"\n*Hidden:* "+body.abilities[1].ability.name.capitalize())
      }
      if(body.abilities.length === 3) {
        Embed.addField(`Abilities:`, body.abilities[0].ability.name.capitalize()+" | "+body.abilities[1].ability.name.capitalize()+"\n*Hidden:* "+body.abilities[2].ability.name.capitalize())
      }
      Embed.setColor("#ffbf00") 
     // if(body.types[1] != null) Embed.setDescription(`**Type:** ${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}`)
      Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/salamence.png`)
      if (getlength(body.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`
        );
      }
      if (getlength(body.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`
        );
      }
      if (getlength(body.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`
        );
      }
      if(arg[1].toLowerCase() === "giratina") Embed.setTitle("Giratina")
      if(arg[1].toLowerCase() === "deoxys") Embed.setTitle("Deoxys")
      message.channel.send(Embed)
      //message.channel.send(`${body.abilities[0].ability} Hidden: ${body.abilities[0].hidden}`)
     // console.log(body)
    }).catch(err => console.log(err))
        }
    } 