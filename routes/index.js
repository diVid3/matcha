const express = require('express')
const router = express.Router()

const {
  redirectAuthenticated,
  redirectNotAuthenticated
} = require('../middleware')

const {
  UsersController,
  AuthenticationController,
  PicturesController,
  TagsController,
  ViewersController
} = require('../controllers')

// Authentication / Verification
router.post('/api/v1.0/login', redirectAuthenticated, AuthenticationController.login)
router.post('/api/v1.0/logout', redirectNotAuthenticated, AuthenticationController.logout)
router.post('/api/v1.0/send-registration-email', redirectAuthenticated, AuthenticationController.sendRegEmail)
router.post('/api/v1.0/send-reset-email', redirectAuthenticated, AuthenticationController.sendResetEmail)

router.get('/api/v1.0/logged-in', redirectNotAuthenticated, AuthenticationController.isLoggedIn)

// Users resource
router.get('/api/v1.0/users', redirectNotAuthenticated, UsersController.getAllUsers)
router.post('/api/v1.0/users', redirectNotAuthenticated, UsersController.createUser)

router.get('/api/v1.0/users/session', redirectNotAuthenticated, UsersController.getUserBySession)
router.get('/api/v1.0/users/id/:id', redirectNotAuthenticated, UsersController.getUserByID)
router.get('/api/v1.0/users/email/:email', redirectNotAuthenticated, UsersController.getUserByEmail)
router.get('/api/v1.0/users/username/:username', redirectNotAuthenticated, UsersController.getUserByUsername)
router.get('/api/v1.0/users/reset-token/:uuid', redirectNotAuthenticated, UsersController.getUserByResetToken)

router.patch('/api/v1.0/users/id/:id', redirectNotAuthenticated, UsersController.patchUserByID)
router.patch('/api/v1.0/users/email/:email', redirectNotAuthenticated, UsersController.patchUserByEmail)
router.patch('/api/v1.0/users/username/:username', redirectNotAuthenticated, UsersController.patchUserByUsername)

router.post('/api/v1.0/users/verify-registration', redirectAuthenticated, UsersController.verifyUserRegistration)
// router.post('/api/v1.0/users/verify-reset', redirectAuthenticated, UsersController.verifyUserPassReset)

// Pictures Resource
router.get('/api/v1.0/pictures/session', PicturesController.getPicturesBySession)

// Tags Resource
router.get('/api/v1.0/tags/session', TagsController.getTagsBySession)

// Viewers Resource
router.get('/api/v1.0/viewers/session', ViewersController.getViewersBySession)

module.exports = router