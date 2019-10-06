const userLoggedIn = (req, res, next) => {
  console.log('User is logged in, redirecting to /profile.');
  next();
};

module.exports = userLoggedIn;