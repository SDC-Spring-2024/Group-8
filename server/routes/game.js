const express = require('express');
const router = express.Router();
const TypingText = require('../models/TypingText');

router.get("/text", async (req, res) => {
    const difficult = req.query.difficulty || "easy";
    try {
        const texts = await TypingText.find({ difficultyLevel: difficult });
        if (texts.length === 0) {
            return res.status(404).json({ msg: `There is no text with difficulty level ${difficult}` });
        }

        const randomIndex = Math.floor(Math.random() * texts.length);
        const randomText = texts[randomIndex].content;

        return res.status(201).json({ content: randomText });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;