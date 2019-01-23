const mongoose = require('mongoose');

const PreviewSchema = mongoose.Schema({
    body: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Preview', PreviewSchema);