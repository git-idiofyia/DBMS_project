var mongoose = require("mongoose");

var complaintSchema = new mongoose.Schema({
    username : String,
    contact  : String, // [{problem:String, option1:String, option2:String, option3:String, option4:String}],
    address  : String, //[{problem:String, option1:String, option2:String, option3:String, option4:String}],
    complaint: String //[{problem:String, option1:String, option2:String, option3:String, option4:String}],
});

module.exports = mongoose.model("Complaint",complaintSchema);