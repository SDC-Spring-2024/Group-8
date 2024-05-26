const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: mongoose.Schema.Types.ObjectId, ref: 'TypingText' },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;