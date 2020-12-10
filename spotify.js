const qs = require('qs')
const axios = require('axios')

const config = require('./config')

class SpotifyClient {
  constructor() {
    this.savedAccessToken = null
    this.apiUrl = 'https://api.spotify.com/v1/'
    this.tokenUrl = 'https://accounts.spotify.com/api/token'
    // base_64_encode (spotify_client_id:spotify_client_secret)
    this.base64AuthString = Buffer.from(
      `${config.spotify_client_id}:${config.spotify_client_secret}`,
    ).toString('base64')
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.savedAccessToken) {
        console.log(
          '[SPOTIFY] Using saved access token: ',
          this.savedAccessToken,
        )
        resolve(this.savedAccessToken)
      } else {
        console.log('[SPOTIFY] Requesting a new access token... ')

        const authData = {
          grant_type: 'client_credentials',
        }

        axios({
          method: 'POST',
          url: this.tokenUrl,
          data: qs.stringify(authData),
          headers: {
            Authorization: `Basic ${this.base64AuthString}`,
            // Accept: 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((response) => {
            this.savedAccessToken = response.data.access_token
            console.log('[SPOTIFY] Access token: ', this.savedAccessToken)
            resolve(this.savedAccessToken)
          })
          .catch((err) => reject(err))
      }
    })
  }

  async search(searchTerm) {
    const accessToken = await this.getAccessToken()

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
}

const spotifyClient = new SpotifyClient()

module.exports = spotifyClient
