const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    preid: {type: String, required: true},
    logchannel: {type:String, required:false},
    wc: {type:String, required:false},
    lc: {type:String, required:false},
    prefix: {type:String, required: false}
});

module.exports = mongoose.model('guilds', productSchema);
