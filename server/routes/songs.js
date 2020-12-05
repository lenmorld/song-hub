const express = require('express')

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

router.get('/songs', (req, res) => {
  res.json(sampleData)
})

module.exports = router
