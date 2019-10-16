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

// Authentication / Verification
router.post('/api/v1.0/login', redirectAuthenticated, AuthenticationController.login);
router.post('/api/v1.0/logout', redirectNotAuthenticated, AuthenticationController.logout);
router.post('/api/v1.0/verify-registration', redirectAuthenticated, AuthenticationController.verifyReg);
router.post('/api/v1.0/verify-reset', redirectAuthenticated, AuthenticationController.verifyReset);
router.post('/api/v1.0/send-registration-email', redirectAuthenticated, AuthenticationController.sendRegEmail)
router.post('/api/v1.0/send-reset-email/:email', redirectAuthenticated, AuthenticationController.sendResetEmail)

// Users resource
router.get('/api/v1.0/users', redirectNotAuthenticated, UsersController.getAllUsers);
router.post('/api/v1.0/users', redirectNotAuthenticated, UsersController.createUser);

router.get('/api/v1.0/users/id/:id', redirectNotAuthenticated, UsersController.getUserByID);
router.get('/api/v1.0/users/username/:username', redirectNotAuthenticated, UsersController.getUserByUsername);
router.delete('/api/v1.0/users/:id', redirectNotAuthenticated, UsersController.deleteUser);
router.patch('/api/v1.0/users/:id', redirectNotAuthenticated, UsersController.patchUser); // TODO: Use this to reset pass.

module.exports = router;