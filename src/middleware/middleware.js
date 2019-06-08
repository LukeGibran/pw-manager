const User = require('../model/user');

const session = async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findOne({ _id: req.session.user._id });
    req.user = user;

    next();
  } else {
    console.log('Please login');
    res.redirect('/');
  }
};

module.exports = session;
