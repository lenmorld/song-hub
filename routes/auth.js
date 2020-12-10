const express = require('express')

const router = express.Router()
const axios = require('axios')
const qs = require('qs')

const {
  authorizationUrl,
  tokenEndpoint,
  userInfoEndpoint,
  redirectUri,
  base64Credentials,
} = require('../helpers/spotifyOauth')

// cached access token
// IMPROVEMENT: put in a class instead
// IMPROVEMENT: use a better cache or DB to persist between server reloads
let savedAccessTokenPayload = null
let userInfo
let message

function getAndRenderUserProfile(tokenObj, res) {
  axios({
    method: 'GET',
    url: userInfoEndpoint,
    headers: {
      Authorization: `Bearer ${tokenObj.access_token}`,
      Accept: 'application/json',
    },
  }).then((result) => {
    // console.log(result.data)
    userInfo = result.data

    // res.redirect('user') // -> auth2/user
    res.redirect('/') // -> auth2/user
    // res.redirect('index')
  })
}

router.get('/', (req, res) => {
  // views/index.ejs gets assets from public/ folder

  res.render('index', {
    message,
    user: userInfo,
    auth_url: authorizationUrl,
  })
  // res.sendFile(__dirname + '/public/index.html');
})

// LOGIN is now managed by frontend

// router.get('/login', (req, res) => {
//   // if token exists already, do the request
//   if (savedAccessTokenPayload) {
//     message = 'Using cached token 🎁'
//     console.log(message)
//     getAndRenderUserProfile(savedAccessTokenPayload, res)
//   } else {
//     // STEP 1: direct user to Spotify login page
//     message = ''
//     res.render('login', {
//       auth_url: authorizationUrl,
//     })
//   }
// })

// STEP 2
router.get('/callback', (req, res) => {
  console.log(req.query)

  // get code from query string
  const authCode = req.query.code

  // STEP 2: send a request to exchange auth code with access token

  axios({
    method: 'post',
    url: tokenEndpoint,
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: redirectUri,
    }),
    headers: {
      Authorization: `Basic ${base64Credentials}`,
    },
  })
    .then((result) => {
      console.log(result.data)
      // cache entire response payload
      savedAccessTokenPayload = result.data

      // STEP 3: send a request using access_token
      getAndRenderUserProfile(savedAccessTokenPayload, res)
    })
    .catch((err) => {
      console.error(err.response.data)
    })
})

// router.get('/user', (req, res) => {
//   if (userInfo) {
//     res.render('index', {
//       user: userInfo,
//       message,
//       auth_url: authorizationUrl,
//     })
//   } else {
//     // res.redirect('/login')
//     res.redirect('/')
//   }
// })

router.get('/logout', (req, res) => {
  // delete saved access token, thus
  // restarting Auth code flow
  savedAccessTokenPayload = null
  userInfo = null

  // res.redirect('/login')
  res.redirect('/')
})

module.exports = router
