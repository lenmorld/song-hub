import React, { useState, useEffect } from 'react'
// import data from "./data";

import SongList from './SongList'
import SongForm from './SongForm'
import Search from './Search'

import fetchRequest from './helpers/fetchRequest'

const SongsHome = ({ user }) => {
  const username = user.display_name
  const [list, setList] = useState([])
  const [formVisible, setFormVisible] = useState(false)
  const [songToEdit, setSongToEdit] = useState(null)
  const [spotifyFormVisible, setSpotifyFormVisible] = useState(null)

  useEffect(() => {
    fetchRequest(`/users/${user.id}/songs`).then((items) => {
      setList(items)
    })
  }, [user.id]) // fetch on load

  const showForm = () => {
    setFormVisible(true)
  }

  const hideForm = () => {
    setFormVisible(false)
    setSongToEdit(null)
  }

  const showSpotifyForm = () => {
    setSpotifyFormVisible(true)
  }

  const hideSpotifyForm = () => {
    setSpotifyFormVisible(false)
  }

  const createItem = async (item) => {
    console.log('CREATE', item)
    // setList((prevList) => prevList.concat(item))

    const updatedSongs = await fetchRequest(`/users/${user.id}/songs`, {
      method: 'POST',
      body: item, // { id, title, artist, album }
    })

    console.log(updatedSongs)
    setList(updatedSongs)

    hideForm()
  }

  const deleteItem = async (itemId) => {
    console.log('DELETE', itemId)
    // setList((prevList) => prevList.filter((_item) => _item.id !== itemId))

    const updatedSongs = await fetchRequest(
      `/users/${user.id}/songs/${itemId}`,
      {
        method: 'DELETE',
      },
    )

    console.log(updatedSongs)
    setList(updatedSongs)
  }

  const editItem = (itemId) => {
    console.log('EDIT', itemId)
    setSongToEdit(list.find((item) => item.id === itemId))
    showForm()
  }

  const saveUpdatedItem = async (item) => {
    const updatedSongs = await fetchRequest(
      `/users/${user.id}/songs/${item.id}`,
      {
        method: 'PUT',
        body: item,
      },
    )

    console.log(updatedSongs)
    setList(updatedSongs)

    hideForm()
  }

  const isAlreadyInList = (itemId) => {
    // Array.some returns true if at least one item matches condition, otherwise false
    const isInList = list.some((oldItem) => oldItem.id === itemId)
    return isInList
  }

  const toggleItemFromSpotify = (item) => {
    console.log(item)
    // if item from Spotify search is already in state
    // remove it
    // otherwise add it
    if (isAlreadyInList(item.id)) {
      deleteItem(item.id)
    } else {
      createItem(item)
    }
  }

  return (
    <div>
      <div className="options">
        <button onClick={showForm}>NEW SONG</button>
        <button onClick={showSpotifyForm}>SEARCH</button>
      </div>
      <SongList
        name={`${username}'s list`}
        list={list}
        deleteItem={deleteItem}
        editItem={editItem}
      />
      {formVisible && (
        <SongForm
          onSubmit={songToEdit ? saveUpdatedItem : createItem}
          song={songToEdit}
          onExit={hideForm}
        />
      )}
      {spotifyFormVisible && (
        <Search
          onExit={hideSpotifyForm}
          toggleItem={toggleItemFromSpotify}
          isAlreadyInList={isAlreadyInList}
        />
      )}
    </div>
  )
}

export default SongsHome
