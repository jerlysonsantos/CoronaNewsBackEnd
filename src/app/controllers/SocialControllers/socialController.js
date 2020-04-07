const express = require('express');
const router = express.Router();
const path = require('path');
const srcPath = path.resolve() + '/src';

const User = require(`${srcPath}/app/models/userModel.js`);

const authMiddleware = require(`${srcPath}/app/middlewares/authMiddleware.js`);

router.use(authMiddleware);

router.get('/showAllUsers', async(req, res) => {
  try {

    const users = await User.find();

    return res.send(users);
  } catch (error) {
    return res.status(400).send({ error: 'Erro em encontrar usuários' });
  }
});

router.get('/getFriends', async(req, res) => {
  try {

    const users = await User.findById(req.userId)
      .populate('friends.friend');

    return res.send(users.friends);
  } catch (error) {
    return res.status(400).send({ error: 'Erro em encontrar usuários' });
  }
});

router.get('/getFriendsInvites', async(req, res) => {
  try {
    const users = await User.findById(req.userId)
      .populate('friendsInvite');

    return res.send(users.friendsInvite);
  } catch (error) {
    return res.status(400).send({ error: 'Erro em encontrar usuários' });
  }
});

router.post('/inviteFriend', async(req, res) => {
  try {
    const { friendId } = req.body;

    const friend = await User.findById(friendId);
    const user = await User.findById(req.userId);

    friend.friendsInvite.push(req.userId);
    user.friends.push({ friend: friendId, accept: false });

    friend.save();
    user.save();

    return res.send({ message: 'Convite enviado' });

  } catch (error) {
    return res.status(400).send({ error: 'Erro em convidar um amigo' });
  }
});

router.post('/acceptInviteFriend', async(req, res) => {
  try {
    const { inviteFriendId } = req.body;

    const user = await User.findById(req.userId);
    const friend = await User.findById(inviteFriendId);

    user.friendsInvite.pull(inviteFriendId);
    user.friends.push({ friend: inviteFriendId, accept: true });

    friend.friends.pull({ friend: req.userId, accept: false });
    friend.friends.push({ friend: req.userId, accept: true });

    user.save();
    friend.save();

    return res.send({ message: 'Convite aceito' });

  } catch (error) {
    return res.status(400).send({ error: 'Erro em aceitar um amigo' });
  }
});

module.exports = app => app.use('/social', router);
