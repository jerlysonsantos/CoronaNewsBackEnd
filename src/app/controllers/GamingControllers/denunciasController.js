const express = require('express');
const router = express.Router();

const path = require('path');
const srcPath = path.resolve() + '/src';

const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);
const levelMiddleware = require(`${srcPath}/app/middlewares/levelMiddleware.js`);

const Denuncia = require(`${srcPath}/app/models/denunciasModel.js`);
const User = require(`${srcPath}/app/models/userModel.js`);

router.use(authMiddleware);

router.post('/register', async (req, res) => {
  try {

    const { type } = req.body;

    const denuncia = await Denuncia.create({ ...req.body, by: req.userId })
    const user = await User.findById(req.userId);

    switch (type) {
      case 'aglomeracoes':
        user.skillTree.cauteloso += 1;
        break;
      case 'risco':
        user.skillTree.protetor += 1;
        break;
      case 'incidenteRecente':
        user.skillTree.sentinela += 1;
        break;
      default:
        break;
    }

    levelMiddleware.leveling(10, user, res)
    user.denuncias.push(req.body);
    user.save();

    return res.send({ denuncia });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: 'Erro em registrar uma denuncia' });
  }
});

router.put('/rankDenuncia/:id/:rank', async (req, res) => {
  try {

    const { id, rank } = req.params;

    const denuncia = await Denuncia.findById(id);


    const user = await User.findById(denuncia.by);

    switch (rank) {
      case '1':
        levelMiddleware.leveling(10, user, res)
        denuncia.rank += 1;
        break;
      case '-1':
        levelMiddleware.leveling(-10, user, res)
        denuncia.rank -= 1;
        break;
      default:
        break;
    }

    if (denuncia.rank <= -10) {
      await Denuncia.findOneAndDelete({ _id: id });
      switch (denuncia.type) {
        case 'aglomeracoes':
          user.skillTree.cauteloso -= 1;
          break;
        case 'risco':
          user.skillTree.protetor -= 1;
          break;
        case 'incidenteRecente':
          user.skillTree.sentinela -= 1;
          break;
        default:
          break;
      }
    }

    denuncia.save();
    user.save()
    return res.send({ ok: true });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: 'Erro em registrar uma denuncia' });
  }
});

router.delete('/reinvoke/:id', async (req, res) => {
  try {

    const { id } = req.params;

    await Denuncia.deleteOne({ id });

    return res.send({ ok: true });
  } catch (error) {
    return res.status(400).send({ error: 'Erro em registrar uma denuncia' });
  }
});

module.exports = app => app.use('/denuncias', router);
