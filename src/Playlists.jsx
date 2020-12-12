import React, { useState, useEffect } from 'react'

import { ImPlay3 } from 'react-icons/im'
import Modal from './Modal'

import playlist from './playlists.json'
import fetchRequest from './helpers/fetchRequest'

const PlaylistPlayback = ({ playlistId, onClose }) => {
  return (
    <Modal visible={!!playlistId} hide={onClose}>
      <iframe
        title="spotiy playlist playback"
        src={`https://open.spotify.com/embed/playlist/${playlistId}`}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </Modal>
  )
}

const Playlists = () => {
  const [playlists, setPlaylists] = useState(playlist.items)
  const [playlistOnPlayback, setPlaylistOnPlayback] = useState(null)

  const hidePlayback = () => setPlaylistOnPlayback(null)

  useEffect(() => {
    fetchRequest(`/playlists`).then((items) => {
      setPlaylists(items)
    })
  }, []) // fetch on load

  return (
    <div>
      <h2>Playlists</h2>
      <div style={{ maxWidth: '90vw', overflow: 'auto' }} className="playlists">
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            // flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {playlists.map((item) => (
            <li key={item.id}>
              <div style={{ margin: '0 1rem' }}>
                <h4>{item.name}</h4>
                <div style={{ position: 'relative' }}>
                  <ImPlay3
                    className="play-icon"
                    onClick={() => {
                      setPlaylistOnPlayback(item.id)
                      // window.open(
                      //     `https://open.spotify.com/playlist/${item.id}`,
                      //     '_blank',
                      //   )}
                    }}
                  />
                  <img
                    src={item.images[0].url}
                    style={{ maxWidth: '150px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* TODO: open this in a pop-up instead and control via the playlist thumbnail */}
        {/* <iframe
          src="https://open.spotify.com/embed/playlist/1rOAtVkFlq9ST525fA2BML"
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        /> */}
      </div>
      {playlistOnPlayback && (
        <PlaylistPlayback
          playlistId={playlistOnPlayback}
          onClose={hidePlayback}
        />
      )}
    </div>
  )
}

export default Playlists
