const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"
const { NekoBot } = require("nekobot-api");
const api = new NekoBot() 


module.exports = {
    name: "clyde",
    category: "Fun",
    description: "Generate a image of Clyde echoing your text!",
    aliases: [],
    usage: "clyde <text>",
    run: async(client, message, args) => {
        const msg = message 
        let image = await api.imageGen.clyde(args.join(" ")); // returns a string.
    console.log(image);
        }
    } 