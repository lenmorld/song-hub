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

// TODO: move this to users/ instead
router.post('/songs/favorite', async (req, res) => {
  const { userId, songId } = req.body

  console.log('Favoriting: ', userId, songId)

  const dbCollection = await DbConnection.getCollection('users')
  const user = await dbCollection.findOne({ id: userId })

  if (!user) {
    res.json({
      error: "User with given id doesn't exist",
    })
    return
  }

  const currentFaveSongs = user.songs

  // add if not there yet
  if (currentFaveSongs.includes(songId)) {
    res.json({
      error: 'Song is already favorite!',
    })
    return
  }

  await dbCollection.updateOne(
    { id: userId },
    {
      $set: {
        songs: [...currentFaveSongs, songId],
        updatedAt: getTimeStamp(),
      },
    },
  )

  // return updated list
  const users = await dbCollection.find().toArray()

  res.json({
    users,
  })
})

module.exports = router
