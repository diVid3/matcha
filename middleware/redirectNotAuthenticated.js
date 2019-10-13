const redirectNotAuthenticated = (req, res, next) => {
  console.log('Client ist\'t authenticated, redirecting!');

  // TODO: Respond with a 401 Unauthorized.

  next();
};

module.exports = redirectNotAuthenticated;
