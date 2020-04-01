const express = require('express');
const router = express.Router();

const path = require('path');
const srcPath = path.resolve() + '/src';

const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);

const Quest = require(`${srcPath}/app/models/questsModel.js`);
const User = require(`${srcPath}/app/models/userModel.js`);

router.use(authMiddleware);

// ========================= Criação e Exibição ================================//
router.post('/addNewQuest', async (req, res) => {
  try {
    const quest = await Quest.create(req.body);

    return res.send({ quest });
  } catch (error) {
    return res.status(400).send({ error: 'Error em adicionar uma nova Quest' })
  }
});

router.get('/getAllQuests', async (req, res) => {
  try {
    const quests = await Quest.find({});

    return res.send({ quests });
  } catch (error) {
    return res.status(400).send({ error: 'Error em exibir as Quests' })
  }
});

// =============================================================================//

router.put('/acceptQuest/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.userId);

    user.questAcquired.push(id);
    user.save();
    return res.send({ ok: 'Quest aceita com sucesso' })

  } catch (error) {
    return res.status(400).send({ error: 'Error em aceitar a Quest' })
  }
});


module.exports = app => app.use('/quests', router);
