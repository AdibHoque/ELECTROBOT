const {Discord, MessageEmbed} = require("discord.js");
const RichEmbed = MessageEmbed
const check = "<a:ElectroCheck:709464171825201315>"
const fail = "<a:ElectroFail:656772856184832025>"

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

module.exports = {
    name: "hex",
    category: "General",
    description: "",
    aliases: [],
    usage: "hex",
    run: async(client, message, args) => {
        const msg = message 
        if(args[0] = "encode") {
          message.channel.send(args[1].hexEncode())
        }
        if(args[0] = "decode") {
          message.channel.send(args[1].hexDecode())
        }
        }
    } 