const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');

router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });

        const newUser = await user.save();

        return res.status(201).json({ user: newUser });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isMatch = bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credential!" });
        }
        req.session.userId = user._id; // store user ID in session
        return res.status(201).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profile: user.profile
            }
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout!' });
        }
        else {
            return res.status(200).json({ message: 'Logged out successfully!' });
        }
    })
});

router.put('/changePassword', async (req, res) => {
    const { user, password, newPassword } = req.body;
    if (!user || !password || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const tmp = await User.findOne({ username: user });
        if (!tmp) {
            return res.status(404).json({ message: "User not found!" });
        }
        const isMatch = bcrypt.compare(password, tmp.password);

        if (!isMatch) {
            return res.status(500).json({ message: "Wrong current password!" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(tmp._id, { password: hashedNewPassword }, { new: true });
        return res.status(201).json({ message: "Successfully changed the password!" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.delete('/deleteAccount', async (req, res) => {
    const { user } = req.body;
    if (!user) {
        return res.status(400).json({ message: 'Please enter the username' });
    }

    try {
        const tmp = await User.findOne({ username: user });
        if (!tmp) {
            return res.status(404).json({ message: "User not found!" });
        }
        await User.findByIdAndDelete(tmp._id);
        return res.status(201).json({ message: "Successfully deleted the account!" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

module.exports = router;

