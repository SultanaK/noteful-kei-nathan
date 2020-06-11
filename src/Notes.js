import React, {Component} from 'react';
import './Notes.css';
import AppContext from './AppContext';
import DeleteButton from './DeleteButton'

class Notes extends Component {
  static contextType = AppContext;

  render() {
    return (
      <AppContext.Consumer>
        {({ notes }) => {
          return notes
            .filter(p => p.id === parseInt(this.props.match.params.note_id))
            .map(note => {
              return (
                <section className="notes-display" key={note.id}>
                  <h3>{note.title}</h3> 
                  <DeleteButton note={note} />
                  {note.content
                    .split('\n \r')
                    .map((para, index) => <p key={index}>{para}</p>)}
                </section>
              )
            })
        }}

      </AppContext.Consumer>
      /* <ul className="notes-list">
        {this.props.notes.map( (note, index) => {
          let dateModified = (new Date(note.modified)).toString();
          return (
            <li key={note.id} className="note">
              <Link to={`/note/${note.id}`}>
                <h2 className="note-title">{note.name}</h2>
              </Link>
              <p className="date-modified">Modified on {dateModified}</p>
              {this.props.filter && <p className="note-content">{note.content}</p>}
              
              <button className="delete-button" type="delete">Delete Note</button>
            </li>
          )
        })}
      </ul> */
    )
  }
}

export default Notes