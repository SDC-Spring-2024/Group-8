const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: mongoose.Schema.Types.ObjectId, ref: 'TypingText' },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { collection: "Session" });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;