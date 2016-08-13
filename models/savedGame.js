let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let savedGameSchema   = new Schema({
	name: String,
	maze: String
});

module.exports = mongoose.model('savedGame', savedGameSchema);