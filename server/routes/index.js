const express = require('express');
const loginRouter = require('./login');
const gameRouter = require('./game');
const recordRouter = require('./record');

const router = express.Router();

router.use('/user', loginRouter);
router.use('/game', gameRouter);
router.use('/stats', recordRouter);

module.exports = router;