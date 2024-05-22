const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt")
const session = require('express-session');

require('dotenv').config();

const app = express();

// Conectarea la baza de date MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// schema pentru utilizatori
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// modelul de utilizator folosind schema definită
const User = mongoose.model('User', userSchema);

// Middleware pentru parsarea corpului cererilor
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'html')));

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));

// Middleware pentru a servi fișiere statice din directoarele "css", "js" și "images"
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Ruta pentru pagina principală
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'MainUnloggedPage.html'));
});

app.get('/MainUnloggedPage.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'MainUnloggedPage.html'));
});

app.get('/loggedPage.html', (req, res) => {
    if (req.session.isAuthenticated) {
        req.session.isAuthenticated = false;
        res.sendFile(path.join(__dirname, 'html', 'loggedPage.html'));
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Ruta pentru pagina de login
app.get('/loginPage.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'loginPage.html'));
});

app.post('/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        if (user.password !== password) {
            console.log('Incorrect password');
            return res.status(401).send('Incorrect password');
        }

        req.session.isAuthenticated = true;
        res.redirect('/loggedPage.html');
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

app.post('/register', async (req, res) => {
    var name = req.body.username;
    var email = req.body.email;
    const password = await bcrypt.hash(req.body.password);

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            console.log('Already registred');
            return res.status(404).send('Already registred');
        }
        const newUser = new User({
            username: name,
            email: email,
            password: password
        });

        await newUser.save();

        if (newUser.isNew) {
            console.log('User not added to database');
            return res.status(500).send('User not added to database');
        }

        console.log(`New user registered: ${newUser}`);

        res.send('User registered successfully');
        res.redirect('/loginPage.html');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});



app.listen(3001, () => {
    console.log("Listening on port 3001");
});
