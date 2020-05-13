const express = require('express');
const multiparty = require('multiparty');

const router = express.Router();
const path = require('path');
const srcPath = path.resolve() + '/src';

const jwt = require('jsonwebtoken');

const User = require(`${srcPath}/app/models/userModel.js`);
const compress = require(`${srcPath}/app/middlewares/compressMiddleware.js`);
const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);
const { secret } = require(`${srcPath}/config/secretToken.json`);

// =========================Gera Um token de Autenticação==================== //
function generateToken(params = {}) {
  return jwt.sign(params, secret, {
    expiresIn: 86400,
  });
}
// ========================================================================== //

router.use(authMiddleware);
// ====================== Avatar Upload ======================= //
router.post('/avatarUpload', async (req, res) => {
  try {
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if (err)
        return res.status(400).send({ error: 'Error em enviar a foto' });
      if (!fields || !files)
        return res.status(400).send({ error: 'Não há arquivos' });


      const { image } = files;

      compress.compressImage(image[0], 800, 600)
        .then(async (data) => {
          const user = await User.findByIdAndUpdate(req.userId, { avatar: data });
          return res.send({ user });
        });
    });
  } catch (error) {
    return res.status(400).send({ error: 'Erro em Adicionar um Avatar' });
  }
});
// ====================== Avatar Upload ======================= //

// ====================== Profile Edit =========================//

router.put('/updateProfile', async (req, res) => {
  try {
    const items = req.body;

    Object.keys(items).forEach(function(key){
      if(items[key] == '')
        delete items[key];
    });
    const user = await User.findById(req.userId);

    Object.keys(user).forEach((key) => {
      if(items['name'])
        user['name'] = items['name'];
      if(items['email'])
        user['email'] = items['email'];
      if(items['password'])
        user['password'] = items['password'];
    });
    user.save();
    return res.send({ user, token: generateToken({ id: user.id }), message: 'Atualizado com sucesso'  });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: 'Erro em Atualizar o perfil' });
  }
});

// ====================== Profile Edit =========================//


module.exports = app => app.use('/options', router);
