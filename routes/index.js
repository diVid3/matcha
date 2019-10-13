const express = require('express');
const router = express.Router();

const {
  redirectAuthenticated,
  redirectNotAuthenticated
} = require('../middleware');

const {
  UsersController,
  AuthenticationController
} = require('../controllers');

// Authentication
router.post('/api/v1.0/login', redirectAuthenticated, AuthenticationController.login);
router.post('/api/v1.0/logout', redirectNotAuthenticated, AuthenticationController.logout);

// Users resource
router.get('/api/v1.0/users', redirectNotAuthenticated, UsersController.getAllUsers);
router.post('/api/v1.0/users', redirectNotAuthenticated, UsersController.createUser);

router.get('/api/v1.0/users/:id', redirectNotAuthenticated, UsersController.getUser);
router.delete('/api/v1.0/users/:id', redirectNotAuthenticated, UsersController.deleteUser);
router.patch('/api/v1.0/users/:id', redirectNotAuthenticated, UsersController.patchUser);

module.exports = router;