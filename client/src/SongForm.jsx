import React from "react";

class SongForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.song) {
      // EDIT
      const { song } = props;
      this.state = {
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album
      };
    } else {
      // CREATE
      this.state = {
        id: "",
        title: "",
        artist: "",
        album: ""
      };
    }
  }

  onChangeFormInput = event => {
    // e.g. ['artist']: 'Artist1'
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitForm = event => {
    if (
      !this.state.id ||
      !this.state.title ||
      !this.state.artist ||
      !this.state.album
    ) {
      alert("FIELDS ARE MANDATORY!");
    } else {
      this.props.onSubmit(this.state);
    }

    event.preventDefault();
  };

  render() {
    return (
      <div className="modal">
        <form>
          <div className="close_form">
            <span onClick={this.props.onExit}>[🗙]</span>
          </div>
          <h3>Create a new item</h3>
          <p>
            <label>ID:</label>
            <input
              name="id"
              onChange={this.onChangeFormInput}
              value={this.state.id}
            />
          </p>
          <p>
            <label>Title:</label>
            <input
              name="title"
              onChange={this.onChangeFormInput}
              value={this.state.title}
            />
          </p>
          <p>
            <label>Artist:</label>
            <input
              name="artist"
              onChange={this.onChangeFormInput}
              value={this.state.artist}
            />
          </p>
          <p>
            <label>Album:</label>
            <input
              name="album"
              onChange={this.onChangeFormInput}
              value={this.state.album}
            />
          </p>

          <div className="submit">
            <button onClick={this.onSubmitForm}>
              {this.props.song ? "EDIT" : "CREATE"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SongForm;
