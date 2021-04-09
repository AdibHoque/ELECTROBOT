const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  preid: {type:Number, required:true},
  name: {type:String, default: 'guild'},
  logchannel: {type:String, required:false},
  joinchannel: {type:String, required:false},
  leavechannel: {type:String, required:false}
});

module.exports = mongoose.model("guild", productSchema); 
