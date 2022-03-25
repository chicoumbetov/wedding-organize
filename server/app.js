const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet'); // security for http headers

// libraries de gestion fichiers
const path = require('path');
const dotenv = require('dotenv')

const postRoutes = require('./routes/posts.js')
const userRoutes = require('./routes/users.js')
const authRoutes = require('./routes/auth.js')

const db = require("./models");

const app = express();
dotenv.config();

app.use(helmet());

// middleware with CORS pour que front 4200 et back 3000 puissent communiquer entre eux.
app.use((req, res, next) => {
    // ces headers permettent:

    // d'accéder à notre API depuis n'importe quelle origine ( '*'
    res.setHeader('Access-Control-Allow-Origin', '*');

    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(cors())

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

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
