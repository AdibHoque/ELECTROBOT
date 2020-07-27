const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  preid: {type:Number, required:true},
  name: {type:String, default: 'user'},
  usernames: {type:String, required:false}, 
  job: {type:String, required:false}, 
  birthday: {type:String, required:false}, 
  gender: {type:String, required:false}, 
  description: {type:String, required:false},
  reputation: {type:Number, required:false} 
});

module.exports = mongoose.model("user", productSchema);

