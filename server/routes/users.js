const express = require('express')
const cors = require('cors')

const DbConnection = require('../db')

const { getTimeStamp } = require('../helpers/dateTime')

const router = express.Router()

router.use(cors())

/*
    {
    "id": 0,
    "name": "Test User",
    "login": "u1",
    "updatedAt": "Sun, 06 Dec 2020 15:16:37 GMT",
    "songs": {
        "2QAHN4C4M8D8E8eiQvQW6a": {
            "id": "2QAHN4C4M8D8E8eiQvQW6a",
            "artist": "One Republics",
            "title": "I Lived",
            "album": "Native"
        },
        "0c4IEciLCDdXEhhKxj4ThA": {
            "id": "0c4IEciLCDdXEhhKxj4ThA",
            "title": "Muse",
            "artist": "Madness",
            "album": "The 2nd Law"
        }
        // ...
    }
}

NOTE: To make it simpler for client,
the return object of /users/:id/songs requests
is array-ified 
Object.values(user.songs)
*/

router.get('/users/:userId/songs', async (req, res) => {
  const { userId } = req.params
  const dbCollection = await DbConnection.getCollection('users')
  const user = await dbCollection.findOne({ id: Number(userId) })

  console.log('GET', user.songs)

  res.json(Object.values(user.songs))
})

router.post('/users/:userId/songs', async (req, res) => {
  const { userId } = req.params
  const id = Number(userId)
  const newSong = req.body

  console.log('userId newSong', userId, newSong)

  const dbCollection = await DbConnection.getCollection('users')
  const user = await dbCollection.findOne({ id })

  if (!user) {
    res.json({
      error: "User with given id doesn't exist",
    })
    return
  }

  const currentFaveSongsKeys = Object.keys(user.songs)

  if (currentFaveSongsKeys.includes(newSong.id)) {
    res.json({
      error: "Song already in user's faves",
    })
    return
  }

  const newFaveSongs = {
    ...user.songs,
    [newSong.id]: newSong,
  }

  await dbCollection.updateOne(
    { id },
    {
      $set: {
        songs: newFaveSongs,
        updatedAt: getTimeStamp(),
      },
    },
  )

  res.json(Object.values(newFaveSongs))
})

router.put('/users/:userId/songs/:songId', async (req, res) => {
  const { userId, songId } = req.params
  const id = Number(userId)
  const songUpdates = req.body

  const dbCollection = await DbConnection.getCollection('users')
  const user = await dbCollection.findOne({ id })

  if (!user) {
    res.json({
      error: "User with given id doesn't exist",
    })
    return
  }

  const currentFaveSongsKeys = Object.keys(user.songs)

  if (!currentFaveSongsKeys.includes(songId)) {
    res.json({
      error: "Song not found in user's faves",
    })
    return
  }

  const songToEdit = {
    ...user.songs[songId],
    ...songUpdates, // entire object replaces old one to allow multi-key updates
  }

  // take out song to replace
  const { [songId]: songToReplace, ...songsToKeep } = user.songs

  const newFaveSongs = {
    ...songsToKeep,
    [songId]: songToEdit,
  }

  await dbCollection.updateOne(
    { id },
    {
      $set: {
        songs: newFaveSongs,
        updatedAt: getTimeStamp(),
      },
    },
  )

  res.json(Object.values(newFaveSongs))
})

router.delete('/users/:userId/songs/:songId', async (req, res) => {
  const { userId, songId } = req.params
  const id = Number(userId)

  const dbCollection = await DbConnection.getCollection('users')
  const user = await dbCollection.findOne({ id })

  if (!user) {
    res.json({
      error: "User with given id doesn't exist",
    })
  }

  const currentFaveSongsKeys = Object.keys(user.songs)

  if (!currentFaveSongsKeys.includes(songId)) {
    res.json({
      error: `Song ${songId} doesn't exist in users' faves`,
    })
    return
  }

  // take out song to delete
  const { [songId]: songToDelete, ...songsToKeep } = user.songs

  await dbCollection.updateOne(
    { id },
    {
      $set: {
        songs: songsToKeep,
        updatedAt: getTimeStamp(),
      },
    },
  )

  res.json(Object.values(songsToKeep))
})

module.exports = router
