// TODO: ERROR-HANDLING: try-catch all the fetch

const qs = require('qs')
const axios = require('axios')

const config = require('../config')

// 2Lor 3L
const TWO_LEGGED = '2L'
const THREE_LEGGED = '3L'

// ---- Spotify endpoints ---
const authorizeEndpoint = 'https://accounts.spotify.com/authorize'
const tokenEndpoint = 'https://accounts.spotify.com/api/token'
const userInfoEndpoint = 'https://api.spotify.com/v1/me'
// ----

// app credentials
const clientId = config.spotify_client_id
const clientSecret = config.spotify_client_secret

// redirect URL
const urlProduction = config.heroku_url // this has to be whitelisted in Spotify client app
const urlDevelopment = 'http://localhost:3000'
const baseUrl = config.node_env === 'production' ? urlProduction : urlDevelopment
const redirectUri = `${baseUrl}/callback`

console.log(redirectUri)

class SpotifyClient {
  static threeLeggedClient = null
  static twoLeggedClient = null

  static getThreeLeggedClient() {
    if (!SpotifyClient.threeLeggedClient) {
      SpotifyClient.threeLeggedClient = new SpotifyClient()
    }

    return SpotifyClient.threeLeggedClient
  }

  static getTwoLeggedClient() {
    if (!SpotifyClient.twoLeggedClient) {
      SpotifyClient.twoLeggedClient = new SpotifyClient()
    }

    return SpotifyClient.twoLeggedClient
  }

  constructor() {
    this.savedAccessToken = null
    this.apiUrl = 'https://api.spotify.com/v1/'
    this.tokenUrl = 'https://accounts.spotify.com/api/token'
    // base_64_encode (spotify_client_id:spotify_client_secret)
    this.base64AuthString = Buffer.from(
      `${config.spotify_client_id}:${config.spotify_client_secret}`,
    ).toString('base64')
  }

  // shared between 2L and 3L
  static getScope(type) {
    // FIXME: customize based on
    // scopes defined at https://developer.spotify.com/documentation/general/guides/scopes/

    // if (type === "USER_READ") {
    // }

    return 'user-library-read%20user-read-email%20user-follow-read'
  }

  // FIXME: shouldn't this be automatic upon creation of 2L client?
  // grant_type: client-credentials
  async getTwoLeggedAccessToken() {
    if (this.savedAccessToken) {
      console.log('[SPOTIFY] Using saved 2L access token: ', this.savedAccessToken)
      return this.savedAccessToken
    }

    const result = await axios({
      method: 'POST',
      url: this.tokenUrl,
      data: qs.stringify({
        grant_type: 'client_credentials',
      }),
      headers: {
        Authorization: `Basic ${this.base64AuthString}`,
      },
    })

    this.savedAccessToken = result.data.access_token
    console.log('[SPOTIFY] Saving new 2L Access token: ', this.savedAccessToken)
    return this.savedAccessToken
  }

  // 2-legged (Client Credentials) API
  // FIXME: specialized class that extends this instead
  // TODO: refresh token when expired
  async search(searchTerm) {
    const accessToken = await this.getTwoLeggedAccessToken()

    const songSearchUrl = `${this.apiUrl}search?query=${searchTerm}&type=track`

    const result = await axios({
      method: 'GET',
      url: songSearchUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })

    // "clean" data so we only get the attributes we need
    const searchResults = result.data.tracks.items
    const squashedResults = searchResults.map((track) => {
      return {
        id: track.id,
        artist: track.artists[0].name,
        album: track.album.name,
        title: track.name,
      }
    })

    return squashedResults
  }

  // 3-legged (Auth code) API
  // FIXME: specialized class that extends this instead
  // TODO: refresh token when expired
  // TODO: abstract request out of these methods,
  //  so refresh can be there
  async completeThreeLeggedAuth({ authCode }) {
    let result;

    try {
      result = await axios({
        method: 'POST',
        url: tokenEndpoint,
        data: qs.stringify({
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: redirectUri,
        }),
        headers: {
          Authorization: `Basic ${this.base64AuthString}`,
        },
      })
    } catch (e) {
      console.error(e)
      throw e
    }

    this.savedAccessToken = result.data.access_token
    console.log('[SPOTIFY] 3L Access token saved: ', this.savedAccessToken)
  }

  getThreeLeggedAccessToken() {
    if (!this.savedAccessToken) {
      throw "[SPOTIFY] Spotify ERROR: 3-Legged auth code flow not initialized!"
    }

    console.log('[SPOTIFY] Using saved 3L access token: ', this.savedAccessToken)
    return this.savedAccessToken
  }

  async getMe() {
    const userInfoEndpoint = 'https://api.spotify.com/v1/me'

    const accessToken = this.getThreeLeggedAccessToken()

    const result = await axios({
      method: 'GET',
      url: userInfoEndpoint,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })

    const userInfo = result.data
    // console.log(userInfo)
    return userInfo
  }

  getAuthorizationUrl({ scope, state }) {
    return `${authorizeEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
  }

  logout() {
    // delete saved access token, thus
    // restarting Auth code flow
    this.savedAccessToken = null
  }
}

module.exports = SpotifyClient
