import React, { useState, useEffect } from 'react'

const Fetchy = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/samples', {
      method: 'GET',
    })
      .then((raw) => raw.json())
      .then((res) => {
        // console.log(res)
        setData(res.songs)
      })
  }, [])

  const handleFavorite = () => {
    // TODO integrate with Songs List UI after
    fetch('/api/songs/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 0,
        songId: 'woho1234',
      }),
    })
      .then((raw) => raw.json())
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <div>
      <h1>Songs</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {`${item.title} - ${item.artist} - ${item.album}`}
          </li>
        ))}
      </ul>
      <button onClick={handleFavorite}>Favorite a song</button>
    </div>
  )
}

export default Fetchy
