const express = require('express');
const router = express.Router();
const path = require('path');
const srcPath = path.resolve() + '/src';

const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);

router.use(authMiddleware);

router.post('/addFriend', async(req, res) => {
  try {

  } catch (error) {
    return res.status(400).send({ error: 'Erro em adicionar um amigo' });
  }
});

module.exports = app => app.use('/social', router);
