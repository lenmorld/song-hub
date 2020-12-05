const express = require('express')

const spotifyClient = require('../spotify')

const router = express.Router()

const sampleData = {
  songs: [
    {
      id: '0c4IEciLCDdXEhhKxj4ThA',
      artist: 'Muse',
      title: 'Madness',
      album: 'The 2nd Law',
    },
    {
      id: '2QAHN4C4M8D8E8eiQvQW6a',
      artist: 'One Republic',
      title: 'I Lived',
      album: 'Native',
    },
    {
      id: '5VnDkUNyX6u5Sk0yZiP8XB',
      artist: 'Imagine Dragons',
      title: 'Thunder',
      album: 'Evolve',
    },
  ],
}

router.get('/samples', (req, res) => {
  res.json(sampleData)
})

// /songs?search=bad+guy
router.get('/songs', async (req, res) => {
  const { search } = req.query
  console.log(`[SPOTIFY] searching ${search}...`)

  const results = await spotifyClient.search(search)
  res.json(results)
})

module.exports = router
