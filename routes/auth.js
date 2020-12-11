const express = require('express')

const router = express.Router()

const SpotifyClient = require('../services/spotify')

let userInfo
let message

const threeLeggedClient = SpotifyClient.getThreeLeggedClient()
const readUserAuthorizationUrl = threeLeggedClient.getAuthorizationUrl({
  scope: SpotifyClient.getScope('USER_READ'),
  state: 'foo=bar&fizz=buzz', // app-specific state that we want to persist on callback
})

router.get('/', async (req, res) => {
  // views/index.ejs gets assets from public/ folder
  res.render('index', {
    message,
    user: userInfo,
    auth_url: readUserAuthorizationUrl,
  })
  // res.sendFile(__dirname + '/public/index.html');
})

router.get('/callback', async (req, res) => {
  await threeLeggedClient.completeThreeLeggedAuth({
    authCode: req.query.code, // auth code in callback
  })

  // 3L client should have an access token now
  userInfo = await threeLeggedClient.getMe()
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  threeLeggedClient.logout()
  userInfo = null

  res.redirect('/')
})

module.exports = router
