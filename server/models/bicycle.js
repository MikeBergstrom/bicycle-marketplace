var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BicycleSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    location: String,
    image: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

var Bicycle = mongoose.model('Bicycle', BicycleSchema);