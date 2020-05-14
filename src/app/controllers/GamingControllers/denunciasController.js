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

    const now = new Date();
    now.setHours(now.getHours() + 24);

    const denuncia = await Denuncia.create({ ...req.body, by: req.userId, expires: now });
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

    user.save();

    return res.send({ denuncia });
  } catch (error) {
    return res.status(400).send({ error: 'Erro em registrar uma denuncia' });
  }
});

router.get('/getAllDenuncias', async (req, res) => {
  try {
    const denuncias = await Denuncia.find({}).populate('by');

    return res.send({ denuncias });
  } catch (error) {
    return res.status(400).send({ error: 'Erro em exibir denuncias' });
  }
});

router.put('/rankDenuncia', async (req, res) => {
  try {

    const { id, rank } = req.body;

    const denuncia = await Denuncia.findById(id);

    denuncia.whoVote.forEach(element => {
      if (element._id == req.userId)
        throw 'Você já votou nessa denuncia';
    });
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

    if (denuncia.rank <= -5) {
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

    denuncia.whoVote.push(req.userId);
    denuncia.save();
    user.save()
    return res.send({ success: 'Voto efetuado com sucesso' });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.delete('/reinvoke/:id', async (req, res) => {
  try {

    const { id } = req.params;

    await Denuncia.findByIdAndDelete(id);

    return res.send({ success: 'Denúncia apagada com sucesso' });
  } catch (error) {
    return res.status(400).send({ error: 'Erro em registrar uma denuncia' });
  }
});

module.exports = app => app.use('/denuncias', router);
