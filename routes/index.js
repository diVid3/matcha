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
  ViewersController,
  BlockedUsersController,
  LikersController,
  FriendsController,
  FakeUsersController,
  ChatSessionsController,
  MessagesController,
  NotificationsController
} = require('../controllers')

// Authentication / Verification
router.post('/api/v1.0/login', AuthenticationController.login)
router.post('/api/v1.0/logout', AuthenticationController.logout)
router.post('/api/v1.0/send-registration-email', AuthenticationController.sendRegEmail)
router.post('/api/v1.0/send-reset-email', AuthenticationController.sendResetEmail)

router.get('/api/v1.0/logged-in', AuthenticationController.isLoggedIn)

// Users resource
router.get('/api/v1.0/users/session/own-username', UsersController.getSessionUsername)
router.get('/api/v1.0/users', UsersController.getAllUsers)
router.get('/api/v1.0/users/tags', UsersController.getAllUsersAndTags)
router.post('/api/v1.0/users', UsersController.createUser)

router.get('/api/v1.0/users/session', UsersController.getUserBySession)
router.get('/api/v1.0/users/id/:id', UsersController.getUserByID)
router.get('/api/v1.0/users/email/:email', UsersController.getUserByEmail)
router.get('/api/v1.0/users/username/:username', UsersController.getUserByUsername)
router.get('/api/v1.0/users/reset-token/:uuid', UsersController.getUserByResetToken)
router.get('/api/v1.0/users/logged-in/:username', UsersController.isLoggedIn)

router.patch('/api/v1.0/users/session', UsersController.patchUserBySession)
router.patch('/api/v1.0/users/email/:email', UsersController.patchUserByEmail)
router.patch('/api/v1.0/users/username/:username', UsersController.patchUserByUsername)

router.post('/api/v1.0/users/verify-registration', UsersController.verifyUserRegistration)
// router.post('/api/v1.0/users/verify-reset', UsersController.verifyUserPassReset)

// Pictures Resource
router.get('/api/v1.0/pictures/session', PicturesController.getPicturesBySession)
router.get('/api/v1.0/pictures/username/:username', PicturesController.getPicturesByUsername)
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
router.get('/api/v1.0/tags/username/:username', TagsController.getTagsByUsername)
router.post('/api/v1.0/tags/session', TagsController.createTagBySession)
router.delete('/api/v1.0/tags/session', TagsController.deleteTagBySessionAndString)

// Viewers Resource
router.get('/api/v1.0/viewers/session', ViewersController.getViewersBySession)
router.post('/api/v1.0/viewers/session', ViewersController.createViewerBySession)

// Likers Resource
router.get('/api/v1.0/likers/session', LikersController.getLikersBySession)
router.post('/api/v1.0/likers/session', LikersController.createLikerBySession)
router.delete('/api/v1.0/likers/session', LikersController.deleteLikerBySession)
router.get('/api/v1.0/likers/username/:username', LikersController.getLikersByUsername)

// Friends Resource
router.get('/api/v1.0/friends/username/:username', FriendsController.getFriendsByUsername)

// Blocked Users Resource
router.get('/api/v1.0/blocked-users/session', BlockedUsersController.getBlockedUsersBySession)
router.post('/api/v1.0/blocked-users/session', BlockedUsersController.createBlockedUserBySession)
router.delete('/api/v1.0/blocked-users/session', BlockedUsersController.deleteBlockedUserBySession)

// Fake Users Resource
router.post('/api/v1.0/fake-users/session', FakeUsersController.createFakeUserBySession)

// Chat Sessions Resource
router.get('/api/v1.0/chat-sessions/session', ChatSessionsController.getChatSessionsBySession)

// Messages Resource
router.get('/api/v1.0/messages/friend/id/:targetUserID', MessagesController.getMessagesBySessionAndTargetID)

// Notifications Resource
router.get('/api/v1.0/notifications/session', NotificationsController.getNotificationsBySession)
router.post('/api/v1.0/notifications/session', NotificationsController.createNotificationBySession)
router.patch('/api/v1.0/notifications/username/:username', NotificationsController.patchNotificationByUsername)

module.exports = router
