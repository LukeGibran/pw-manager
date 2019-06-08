const express = require('express');
const router = new express.Router();
const session = require('../middleware/middleware');
const Password = require('../model/password');
const CryptoJS = require('crypto-js');
// const process = require('../../config/config');

router.get('/home', session, async (req, res) => {
  try {
    // const pw = await Password.find({ owner: req.session.user._id });
    await req.user
      .populate({
        path: 'password'
      })
      .execPopulate();

    req.user.password.forEach(element => {
      element.icon = element.domain.replace('.com', '').toLowerCase();
    });
    res.render('home', {
      name: `${req.user.fname} ${req.user.lname}`,
      data: req.user.password,
      icon: req.user.password.domain
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/create', session, (req, res) => {
  res.render('create', {
    name: `${req.user.fname} ${req.user.lname}`
  });
});

router.post('/create', session, async (req, res) => {
  const pw = new Password({ ...req.body, owner: req.user._id });
  try {
    await pw.save();
    res.render('create', {
      name: `${req.user.fname} ${req.user.lname}`,
      message: 'Password successfully created!',
      icon: 'check',
      color: 'info'
    });
  } catch (error) {
    console.log(error);
    res.render('create', {
      name: `${req.user.fname} ${req.user.lname}`,
      message: error,
      icon: 'exclamation-triangle',
      color: 'danger'
    });
  }
});

router.post('/decrypt', session, async (req, res) => {
  const pwDecrypt = req.body.password;
  try {
    const pw = await Password.findOne({
      password: pwDecrypt,
      owner: req.user._id
    });
    if (!pw) {
      return res.status(404).send({ error: 'No password found!' });
    }

    const bytes = CryptoJS.AES.decrypt(
      pw.password.toString(),
      process.env.CIPHER_TEXT
    );
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    res.send({ password: plaintext });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
module.exports = router;
