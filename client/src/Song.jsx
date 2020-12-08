import React from 'react'

const Song = (props) => (
  <div className="item">
    <div className="delete_edit_button">
      <span
        onClick={() =>
          props.toggleItem
            ? props.toggleItem(props.item)
            : props.deleteItem(props.item.id)
        }
        role="img"
        aria-label="close"
      >
        {props.isAlreadyInList
          ? props.isAlreadyInList(props.item.id)
            ? '❎'
            : '💚'
          : '❎'}
      </span>
      {!props.noEditButton && (
        <span
          onClick={() => props.editItem(props.item.id)}
          role="img"
          aria-label="edit"
        >
          📝
        </span>
      )}
    </div>
    <div className="left">
      <iframe
        title="spotify-embed"
        src={`https://open.spotify.com/embed/track/${props.item.id}`}
        width="80"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </div>
    <div className="right">
      <div className="title">{props.item.title}</div>
      <div className="artist">{props.item.artist}</div>
      <div className="album">{props.item.album}</div>
    </div>
  </div>
)
export default Song
