import React, { useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'

import SongList from './SongList'

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
    <div className="spotify_modal">
      <div className="spotify_wrapper">
        <div className="close_form">
          <span onClick={onExit}>
            <AiOutlineCloseSquare />
          </span>
        </div>
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
      </div>
    </div>
  )
}

export default Search
