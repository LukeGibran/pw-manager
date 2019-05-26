const mongoose = require('mongoose');
const process = require('../../config/config');

mongoose.connect(process.env.MONGODB_ENV_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
