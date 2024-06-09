const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

router.get("/session/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const sessions = await Session.find({ user: userId });

        return res.status(201).json({ sessions: sessions });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post("/session/:userId/submit", async (req, res) => {
    const user = req.params.userId;
    const { text, wpm, accuracy } = req.body;

    if (!user || !text || !wpm || !accuracy) {
        return res.status(400).json({ message: "Some fields are missing!" });
    }

    try {
        const newSession = new Session({
            user: user,
            text: text,
            wpm: wpm,
            accuracy: accuracy
        });

        const savedSession = await newSession.save();
        return res.status(201).json(savedSession);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

module.exports = router;