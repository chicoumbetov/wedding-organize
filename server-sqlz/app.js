const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models");
const helmet = require('helmet'); // security for http headers
const path = require('path');
const cors = require('cors');

const app = express();
const dotenv = require('dotenv')

const postRoutes = require('./routes/posts.js')
const userRoutes = require('./routes/users.js')
const authRoutes = require('./routes/auth.js')

require('dotenv').config();

app.use(cors());

//Connexion à la base de données

db.sequelize
    .authenticate()
    .then(() => {
        console.log("Connecté à la base de données avec succès");
    })
    .catch((error) => {
        console.log("Impossible de se connecter à la base de données : ", error);
    });

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(bodyParser.json({ limit: "30mb", extended: true}))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Extraction des données JSON

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello to wedding API')
})

db.sequelize
    .authenticate()
    .then(() => {
        console.log("Connecté à la base de données avec succès");
    })
    .catch((error) => {
        console.log("Impossible de se connecter à la base de données : ", error);
    });

module.exports = app;
