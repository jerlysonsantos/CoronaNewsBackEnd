exports.leveling = async(xp, user, res) => {
  try {
    user.xp += xp;

    if (user.xp >= 20 * user.level)
      user.level += 1;

    if (user.level >= 15 && user.level < 30)
      user.tag = 'Intermediário';
    else if (user.level >= 30 && user.level < 45)
      user.tag = 'Avançado';
    else if (user.level >= 45 && user.level < 60)
      user.tag = 'Expert';
    else
      user.tag = 'Embaixador';

    return 0;

  } catch (error) {
    return res.status(400).send({ error: 'Error no level' })
  }
};
