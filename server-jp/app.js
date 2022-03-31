const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models");
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Extraction des données JSON
app.use('/images', express.static(path.join(__dirname, 'images'))); // Gestionnaire de routage


app.use('/api/users', userRoutes); // Utilisation des routes user
app.use('/api/posts', postRoutes); // Utilisation des routes post
app.use("/api/comments", commentRoutes); // Utilisation 
app.use("/api/likes", likeRoutes);

module.exports = app;