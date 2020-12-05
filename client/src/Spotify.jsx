import React from "react";

import SongList from "./SongList";

class Spotify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchResults: []
    };
  }

  trackSearchTerm = event => {
    var searchTerm = event.target.value;
    // console.log(`[Spotify.jsx] ${search_term}`);

    this.setState({
      searchTerm: searchTerm
    });
  };

  searchSpotify = () => {
    fetch(`/api/songs/search?search=${this.state.searchTerm}`)
        .then((raw) => raw.json())
        .then((results) => {
          console.log(results)
            this.setState({
                searchResults: results
            });
        })
        .catch(err => {
            console.log(`[Spotify.jsx] search error: ${err}`);
        });
  };

  render() {
    return (
      <div className="spotify_modal">
        <div className="spotify_wrapper">
          <div className="close_form">
            <span onClick={this.props.onExit}>[🗙]</span>
          </div>
          <h3>Spotify search</h3>
          <div className="spotify_input">
            <input type="text" onChange={this.trackSearchTerm} />
            <button onClick={this.searchSpotify}>Search</button>
          </div>
          <SongList
            list={this.state.searchResults}
            isAlreadyInList={this.props.isAlreadyInList}
            toggleItem={this.props.toggleItem}
            noEditButton={true}
          />
        </div>
      </div>
    );
  }
}

export default Spotify;
