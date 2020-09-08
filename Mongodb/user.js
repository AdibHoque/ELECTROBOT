const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  preid: {type:String, required:true},
  name: {type:String, default: 'users'},
  cmdused: {type:Number, default:0},
  usertag: {type:String, required:false},
  usernames: {type:String, required:false}, 
  nickname: {type:String, required:false}, 
  birthday: {type:String, required:false}, 
  gender: {type:String, required:false}, 
  marriedto: {type:String, required:false},
  marriedtoname: {type:String,  required:false},
  description: {type:String, required:false},
  rep: {type:Number, default:0},
  lastdaily: {type:Number, required:false},
  lastrep:{type:Number, required:false},
  lastrob:{type:Number, required:false},
  lastrobbed:{type:Number, required:false},
  lastbeg:{type:Number, required:false},
  lastmeme:{type:Number, required:false},
  lastsearch:{type:Number, required:false},
  balance: {type:Number, default:0},
  dailystreak: {type:Number, default:0}
});

module.exports = mongoose.model("users", productSchema);

