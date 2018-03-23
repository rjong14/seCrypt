var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = mongoose.Schema({
    name             : {type: String, required : true, unique: true},
    message          : {type: String, required : true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);
