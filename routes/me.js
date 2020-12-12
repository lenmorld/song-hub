const express = require('express')

const router = express.Router()

const SpotifyClient = require('../services/spotify')

const threeLeggedClient = SpotifyClient.getThreeLeggedClient()

router.get('/playlists', async (req, res) => {
  const result = await threeLeggedClient.getMePlaylists()
  res.json(result.items)
})

module.exports = router
