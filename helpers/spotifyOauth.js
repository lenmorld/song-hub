// import env. variables
const config = require('../config')

const urlProduction = config.heroku_url // this has to be whitelisted in Spotify client app
const urlDevelopment = 'http://localhost:3000'

const baseUrl = config.node_env ? urlProduction : urlDevelopment

// app credentials
const CLIENT_ID = config.spotify_client_id
const CLIENT_SECRET = config.spotify_client_secret

// Spotify endpoints
const authorizeEndpoint = 'https://accounts.spotify.com/authorize'
exports.tokenEndpoint = 'https://accounts.spotify.com/api/token'
exports.userInfoEndpoint = 'https://api.spotify.com/v1/me'

// --- Authorization code flow params ---
// this must be whitelisted in the Spotify dev app
// const redirectUri = 'http://localhost:3000/callback'
const redirectUri = `${baseUrl}/callback`

exports.redirectUri = redirectUri
// scopes defined at https://developer.spotify.com/documentation/general/guides/scopes/
const scope = 'user-library-read%20user-read-email%20user-follow-read'
// app-specific state that we want to persist on callback
const state = 'foo=bar&fizz=buzz'

exports.base64Credentials = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
).toString('base64')

// build authorization string:
// https://accounts.spotify.com/authorize?client_id=CLIENT_ID&
// response_type=code&redirect_uri=REDIRECT_URI&scope=SCOPES&state=STATE

// redirect_uri, scope, and state values must be URLencoded
exports.authorizationUrl = `${authorizeEndpoint}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri,
)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
