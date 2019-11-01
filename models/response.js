var mongoose = require("mongoose");
    
var responseSchema = new mongoose.Schema({
    status : String,
    expectedDate: Date,
    
});

module.exports = mongoose.model("Response",responseSchema);