const levelMiddleware = require('./levelMiddleware.js');

exports.quests = (user, data, res) => {
  return {
    firstDenuncia: () => {
      if (user.denuncias.length != 0) {
        user.questAcquired.pull({ _id: data.id  });
        user.questsCompleted.push({ title: data.title, description: data.description });
        levelMiddleware.leveling(data.xp, user, res);
        user.save();
        return res.send({ message: 'Quest Concluida' });
      }
      else
        return res.send({ message: 'Requisitos para concluir não alcançados' })
    },

    gay: () => {
      console.log('meme')
    }
  }
};
