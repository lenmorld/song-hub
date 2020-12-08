const express = require('express')
const cors = require('cors')

const spotifyClient = require('../spotify')
const DbConnection = require('../db')

const { getTimeStamp } = require('../helpers/dateTime')

const router = express.Router()

router.use(cors())

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
router.get('/songs/search', async (req, res) => {
  const { search } = req.query
  console.log(`[SPOTIFY] searching ${search}...`)

  const results = await spotifyClient.search(search)
  res.json(results)
})

module.exports = router
