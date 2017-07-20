var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    bicycles: [{type:Schema.Types.ObjectId, ref:'Bicycle'}]  
}, {timestamps: true})

var User = mongoose.model('User', UserSchema);