const express = require('express');
const router = express.Router();

const {
  userLoggedIn,
  userNotLoggedIn
} = require('../middleware');

const {
  LandingController,
  RegisterController,
  LoginController,
  ProfileController
} = require('../controllers');

router.get('/landing', userLoggedIn, LandingController.get);
router.post('/register', RegisterController.post);
router.post('/login', LoginController.post);

router.get('/profile', userNotLoggedIn, ProfileController.get);
router.post('/profile', userNotLoggedIn, ProfileController.post);

module.exports = router;