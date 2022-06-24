// Import des packages requis, les routes, et la base de donnée

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/likes');
const commentsRouter = require('./routes/comments');

const { sequelize } = require('./models');

const app = express();

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

app.use(cors());
app.use(helmet());

// Transformation de la requete en json, et appel des routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/sign', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);
app.use('/image', express.static(path.join(__dirname, 'image')));

const bdCheck = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connecté à la BDD.');
  } catch (error) {
    console.error('Connexion impossible à la BDD ', error);
  }
};
bdCheck();

module.exports = app;
