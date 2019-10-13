const redirectAuthenticated = (req, res, next) => {
  console.log('Client is authenticated, redirecting!');

  // TODO: Respond with a redirect to /profile

  next();
};

module.exports = redirectAuthenticated;