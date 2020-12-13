import React, { useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'

import SongList from './SongList'
import Modal from './Modal'

const Search = ({ onExit, isAlreadyInList, toggleItem }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const trackSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchSpotify = () => {
    fetch(`/api/songs/search?search=${searchTerm}`)
      .then((raw) => raw.json())
      .then((results) => {
        console.log(results)
        setSearchResults(results)
      })
      .catch((err) => {
        console.log(`[Spotify.jsx] search error: ${err}`)
      })
  }

  return (
    <Modal
      hide={onExit}
      visible
      containerStyle={{
        width: '80%',
        height: '90%',
        overflow: 'auto',
      }}
    >
      <h3>Spotify search</h3>
      <div className="spotify_input">
        <input type="text" onChange={trackSearchTerm} />
        <button onClick={searchSpotify}>Search</button>
      </div>
      <SongList
        list={searchResults}
        isAlreadyInList={isAlreadyInList}
        toggleItem={toggleItem}
        noEditButton
      />
    </Modal>
  )
}

export default Search
