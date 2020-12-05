import React from 'react'
import Song from './Song'

class SongList extends React.Component {
  render() {
    const { list } = this.props
    return (
      <div>
        <h3>{this.props.name}</h3>
        <div className="items_grid">
          {list.map((item) => (
            <Song
              item={item}
              key={item.id}
              deleteItem={this.props.deleteItem}
              editItem={this.props.editItem}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default SongList
