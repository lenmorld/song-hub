import React from "react";
import { AiOutlineCloseSquare } from 'react-icons/ai'

import Modal from './Modal'
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
    const isEditMode = this.props.song;

    return (
      <Modal visible hide={this.props.onExit} containerStyle={{
        // minWidth: '400px'
      }}
      contentStyle={{
        display: 'block'
      }}
      >
        <form className="modal-form">
          <h3>{isEditMode ? "Edit song" : "Create a new song"}</h3>
          <div className="field">
            <label>ID:</label>
            <input
              name="id"
              value={this.state.id}
              disabled={isEditMode}
            />
          </div>
          <div className="field">
            <label>Title:</label>
            <input
              name="title"
              onChange={this.onChangeFormInput}
              value={this.state.title}
            />
          </div>
          <div className="field">
            <label>Artist:</label>
            <input
              name="artist"
              onChange={this.onChangeFormInput}
              value={this.state.artist}
            />
          </div>
          <div className="field">
            <label>Album:</label>
            <input
              name="album"
              onChange={this.onChangeFormInput}
              value={this.state.album}
            />
          </div>

          <div className="submit" style={{ marginTop: '1rem'}}>
            <button onClick={this.onSubmitForm}>
              {isEditMode ? "EDIT" : "CREATE"}
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default SongForm;
