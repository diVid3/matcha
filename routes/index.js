const express = require('express')
const router = express.Router()

const uuidv4 = require('uuid/v4')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pictures/')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '.' + file.mimetype.split('/')[1])
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return cb(null, true)
    }
    req.MulterFileValidationError = true
    cb(null, false)
  }
})

// const {
//   redirectAuthenticated,
//   redirectNotAuthenticated
// } = require('../middleware')

const {
  UsersController,
  AuthenticationController,
  PicturesController,
  TagsController,
  ViewersController
} = require('../controllers')

// Authentication / Verification
router.post('/api/v1.0/login', AuthenticationController.login)
router.post('/api/v1.0/logout', AuthenticationController.logout)
router.post('/api/v1.0/send-registration-email', AuthenticationController.sendRegEmail)
router.post('/api/v1.0/send-reset-email', AuthenticationController.sendResetEmail)

router.get('/api/v1.0/logged-in', AuthenticationController.isLoggedIn)

// Users resource
router.get('/api/v1.0/users', UsersController.getAllUsers)
router.post('/api/v1.0/users', UsersController.createUser)

router.get('/api/v1.0/users/session', UsersController.getUserBySession)
router.get('/api/v1.0/users/id/:id', UsersController.getUserByID)
router.get('/api/v1.0/users/email/:email', UsersController.getUserByEmail)
router.get('/api/v1.0/users/username/:username', UsersController.getUserByUsername)
router.get('/api/v1.0/users/reset-token/:uuid', UsersController.getUserByResetToken)

router.patch('/api/v1.0/users/id/:id', UsersController.patchUserByID)
router.patch('/api/v1.0/users/email/:email', UsersController.patchUserByEmail)
router.patch('/api/v1.0/users/username/:username', UsersController.patchUserByUsername)

router.post('/api/v1.0/users/verify-registration', UsersController.verifyUserRegistration)
// router.post('/api/v1.0/users/verify-reset', UsersController.verifyUserPassReset)

// Pictures Resource
router.get('/api/v1.0/pictures/session', PicturesController.getPicturesBySession)
router.post(
  '/api/v1.0/pictures/pp/session',
  upload.single('fileSelectedPP'),
  PicturesController.storeProfilePictureBySession
)
router.post(
  '/api/v1.0/pictures/session',
  upload.fields([
    {
      name: 'fileSelected1',
      maxCount: 1
    },
    {
      name: 'fileSelected2',
      maxCount: 1
    },
    {
      name: 'fileSelected3',
      maxCount: 1
    },
    {
      name: 'fileSelected4',
      maxCount: 1
    }
  ]),
  PicturesController.storePictureBySession
)

// Tags Resource
router.get('/api/v1.0/tags/session', TagsController.getTagsBySession)
router.post('/api/v1.0/tags/session', TagsController.createTagBySession)
router.delete('/api/v1.0/tags/session', TagsController.deleteTagBySessionAndString)

// Viewers Resource
router.get('/api/v1.0/viewers/session', ViewersController.getViewersBySession)

module.exports = router