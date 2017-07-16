var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	//String object in javascript global variable
	name : String,
	email : {
		type : String, 
		lowercase : true
	},
	message : String
});

var Message = mongoose.model('Messages', MessageSchema);
//'user' is the name of the collection where the models are stored
//if collection does not exist, then it will br created
//the second argument is the schema we want to base out models on
//User represents the entire collection of data based on the user model

module.exports = Message;