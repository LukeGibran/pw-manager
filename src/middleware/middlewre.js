const auth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    console.log('Please login');
    res.redirect('/');
  }
};

module.exports = auth;
