exports.quests = (user, res) => {
  return {
    firstDenuncia: () => {
      if (user.denuncias.length != 0) {
        user.questAcquired.pull({ _id: id  });
        user.questsCompleted.push({ title: fields.title[0], description: fields.description[0] });
      }
      else
        console.log('ai trollo')
    },

    gay: () => {
      console.log('meme')
    }
  }
};
