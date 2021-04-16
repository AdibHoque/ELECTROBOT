const Discord = require("discord.js")

class Board{
  constructor(player1, player2, channel){
    this.channel = channel
    this.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]
    this.channel.send("The game is loading, please wait...").then(m => {
      this.m = m
    }).then(() => {
      this.channel.send("The game is loading, please wait...").then(mex => {
        this.mex = mex
        this.player1 = new Player(player1, "red", channel, this.m, this.mex)
        this.player1 = new Player(player1, "blue", channel, this.m, this.mex)
        this.print()
        this.game()
      })
  })
}

  game(){
    while(true){
      this.update(this.player1.turn(), this.player1.color)
      this.print()
      this.check()
      this.update(this.player2.turn(), this.player2.color)
      this.print()
      this.check()
    }
  }


  update(j, color){
    var i = 0
    for(var k = 0; k < 6; k++){
      if(k == 5){
        i = k
        break
      }
      if(this.board[k-1][j] != 0){
        i = k
        break
      }
    }
    switch (color) {
      case "red":
        this.board[i][j] = 1
        break;
      case "blue":
        this.board[i][j] = 2
        break;
      default:
        this.board[i][j] = 2
    }
  }

  print(){
    this.channel.startTyping()
    let str = ":one::two::three::four::five::six::seven:\n\n"
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        switch (this.board[i][j]) {
          case 0:
            str += ":white_circle:"
            break;
          case 1:
            str += ":red_circle:"
            break;
          case 2:
            str += ":blue_circle:"
            break;
        }
      }
      str += "\n"
    }
    let embed = new Discord.MessageEmbed()
      .setTitle("Connect Four Game")
      .setColor("#ffbf00")
      .setDescription(str)
    this.m.edit(embed)
    this.channel.stopTyping()
  }

}

class Player {
  constructor(id, color, channel, m, mex, board){
    this.channel = channel
    this.id = id
    this.color = color
    this.name = channel.guild.members.cache.get(id).nickname
    this.m = m
    this.mex = mex
  }

turn(){
  this.mex.edit(this.name + " turn :"+this.color+"_circle:")
    this.m.react('1⃣')
    .then(() => this.m.react('2⃣'))
    .then(() => this.m.react('3⃣'))
    .then(() => this.m.react('4⃣'))
    .then(() => this.m.react('5⃣'))
    .then(() => this.m.react('6⃣'))
    .then(() => this.m.react('7⃣'))
    .catch(console.log("One emoji failed to react"))

const filter = (reaction, user) => {
    return ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣'].includes(reaction.emoji.name) && user.id === this.id;
};

this.m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();
      switch (reaction.emoji.name) {
        case '1⃣':
          return 1
          break;
        case '2⃣':
          return 2
          break;
        case '3⃣':
          return 3
          break;
        case '4⃣':
          return 4
          break;
        case '5⃣':
          return 5
          break;
        case '6⃣':
          return 6
          break;
        case '7⃣':
          return 7
          break;
      }
    })
  }
}

module.exports = Board 
