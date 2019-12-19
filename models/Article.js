var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var FindItSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

var FindIt = mongoose.model('FindIt', FindItSchema);

module.exports = FindIt;


