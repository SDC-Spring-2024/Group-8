const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index.js');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/api', routes);

const mongodbUrl = process.env.DB_STRING;

mongoose.connect(mongodbUrl)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error('MongoDB connection error: ', err));

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});