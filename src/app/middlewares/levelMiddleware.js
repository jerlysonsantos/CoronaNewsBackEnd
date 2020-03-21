exports.leveling = async(xp, user, res) => {
  try {
    user.xp += xp;

    if (user.xp >= 20 * user.level) {
      user.level += 1;
    }

    return 0;

  } catch (error) {
    return res.status(400).send({ error: 'Error no level' })
  }
};
