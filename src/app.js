const path = require('path');
const hbs = require('hbs');
require('./db/mongoose');
const userRouter = require('./routes/users');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const pubDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3100;

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

app.use(userRouter);

app.get('*', (req, res) => {
  res.render('error');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
