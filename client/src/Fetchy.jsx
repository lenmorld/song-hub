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
    </div>
  )
}

export default Fetchy
