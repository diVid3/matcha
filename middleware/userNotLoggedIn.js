const userNotLoggedIn = (req, res, next) => {
  console.log('User is not logged in, redirecting to /login.');
  next();
};

module.exports = userNotLoggedIn;