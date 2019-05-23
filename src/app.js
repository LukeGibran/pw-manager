const path = require('path');
const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const pubDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3100;

const auth = require('./middleware/middlewre');

app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialPath);
app.use(express.static(pubDirPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: 'SecretKey', resave: false, saveUninitialized: true })
);

var Users = [];

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    name: 'Salman khan'
  };
  Users.push(newUser);
  req.session.user = newUser;
  res.redirect('/home');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('user has logged out');
  });

  res.redirect('/');
});

app.get('/home', auth, (req, res) => {
  res.render('home', {
    id: req.session.user.email,
    name: req.session.user.name
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
