const express = require('express');
const router = new express.Router();
const session = require('../middleware/middleware');
const User = require('../model/user');

router.get('/', (req, res) => {
  res.render('login');
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
    id: req.session.user.email,
    name: req.session.user.fname + req.session.user.lname
  });
});

module.exports = router;
