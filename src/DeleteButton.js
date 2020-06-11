import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from './AppContext';
import './DeleteButton.css';

export default class DeleteButton extends Component {
  static contextType = AppContext;
  render() {
    let noteId = this.props.note.id;
    return(
      <Link to="/">
        <button
          type="submit"
          className="delete-button"
          onClick={() => this.context.handleDeleteFetch(noteId)}>
          Delete
        </button>
      </Link>
    )
  }
}
