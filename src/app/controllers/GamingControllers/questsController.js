const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
const srcPath = path.resolve() + '/src';

const compress = require(`${srcPath}/app/middlewares/compressMiddleware.js`);
const levelMiddleware = require(`${srcPath}/app/middlewares/levelMiddleware.js`);
const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);

const Quest = require(`${srcPath}/app/models/questsModel.js`);
const User = require(`${srcPath}/app/models/userModel.js`);

const questLine = require(`${srcPath}/app/middlewares/questLine.js`);

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

router.put('/acceptQuest/', async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(req.userId);

    user.questAcquired.push(id);
    user.save();
    return res.send({ ok: 'Quest aceita com sucesso' })

  } catch (error) {
    return res.status(400).send({ error: 'Error em aceitar a Quest' });
  }
});

router.put('/completeQuest/:id', async (req, res) => {
  try {
    const form = new multiparty.Form();
    const { id } = req.params;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).send({ error: 'Error em enviar a foto' });
      }
      if (!fields || !files) {
        return res.status(400).send({ error: 'Não há arquivos' });
      }

      const { image } = files;

      compress.compressImage(image[0], 800, 600)
        .then(async (data) => {
          const user = await User.findById(req.userId);
          user.questAcquired.pull({ _id: id  });
          user.questsCompleted.push({ picture: data, title: fields.title[0], description: fields.description[0] });

          levelMiddleware.leveling(fields.xp[0], user, res);

          user.save();
          return res.send({ user });
        });
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: 'Error em completar a Quest' })
  }
});

router.post('/completeAdmQuest', async (req, res) => {
  const { questName } = req.body;
  const user = await User.findById(req.userId);
  const quest = questLine.quests(user, res);

  const BreakException = { break: 'Break' };
  Object.keys(quest).forEach(function(key){
    if (key === questName)
      quest[key]();
      throw BreakException;
  });
});

module.exports = app => app.use('/quests', router);
