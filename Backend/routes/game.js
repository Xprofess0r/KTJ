const express = require('express')
const router = express.Router()
// const Multer = require('../utils/multer');
const gameController = require('../Controllers/game_controller')
const auth = require('../Auth/auth_middleware')
const is_admin = require('../Auth/is_admin')
const getUserId = require('../utils/getuserId')

router.get('/', auth, is_admin, gameController.getGames)
router.get('/getgame',auth,gameController.getgameById);
router.get('/getgames', gameController.getUserGames)
router.post(
  '/createGame',
  auth,
  is_admin,
  getUserId,
  // ,Multer.single("gameImage")
  gameController.createGame
)
router.post(
  '/updateGame',
  auth,
  is_admin,
  getUserId,
  // Multer.single("gameImage"),
  gameController.updategame
)
// router.get('/getgame/:gameId', auth, gameController.getgameById)
router.post('/deleteGame', auth, is_admin, getUserId, gameController.deleteGame)

module.exports = router
