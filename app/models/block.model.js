const mongoose = require('mongoose');

const BlockSchema = mongoose.Schema({
	title: String,
	description: String,
    preview: String,
    category: String,
    body: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Block', BlockSchema);