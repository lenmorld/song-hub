import React from 'react'
import Song from './Song'

const SongList = (props) => {
  const {
    list,
    name,
    deleteItem,
    editItem,
    toggleItem,
    isAlreadyInList,
    noEditButton,
  } = props
  return (
    <div>
      <h3>{name}</h3>
      <div className="items_grid">
        {list.map((item) => (
          <Song
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            editItem={editItem}
            toggleItem={toggleItem}
            isAlreadyInList={isAlreadyInList}
            noEditButton={noEditButton}
          />
        ))}
      </div>
    </div>
  )
}

export default SongList
