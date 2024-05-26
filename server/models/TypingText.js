const mongoose = require('mongoose');

const typingTextSchema = new mongoose.Schema({
    content: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    source: String,
    createdAt: { type: Date, default: Date.now }
});

const TypingText = mongoose.model("TypingText", typingTextSchema);

module.exports = TypingText;