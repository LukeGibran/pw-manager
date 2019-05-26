const express = require('express');
const router = new express.Router();
const session = require('../middleware/middleware');
const User = require('../model/user');

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/home');
  }
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.authenticate(req.body.email, req.body.password);

    req.session.user = user;
    res.redirect('/home');
  } catch (error) {
    res.status(404).render('login', {
      error
    });
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    req.session.user = user;
    res.status(201).redirect('/home');
  } catch (error) {
    res.status(500).render('signup', { error });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('user has logged out');
  });
  res.redirect('/');
});

router.get('/home', session, (req, res) => {
  res.render('home', {
    name: `${req.session.user.fname} ${req.session.user.lname}`
  });
});

module.exports = router;
