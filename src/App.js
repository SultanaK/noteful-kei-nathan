import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import STORE from './dummy-store';
import Main from './Main'
import FolderFilterFunction from './FolderFilterFunction'
import NoteFilterFunction from './NoteFilterFunction'
import NotFoundPage from './NotFoundPage'
import './App.css'
import AppContext from './AppContext'
import config from './config'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: STORE.folders,
      notes: STORE.notes
    };
  }

  componentDidMount(){
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
      ])
        .then(([notesResponse,foldersResponse])=>{
            if (!notesResponse.ok)
                    return notesResponse.json().then(e => Promise.reject(e));
                if (!foldersResponse.ok)
                    return foldersResponse.json().then(e => Promise.reject(e));
        
            return Promise.all([notesResponse.json(), foldersResponse.json()]);
    })
    .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });

  }
  handleDeleteFetch = (noteId) => {
    fetch(config.API_ENDPOINT + `/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(this.handleDelete(noteId))
      .catch(error => console.log(error))
  }

  handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

  
  render() {
    const context ={
      folders: this.state.folders,
      notes: this.state.notes,
      handleDeleteFetch: this.handleDeleteFetch,
      deleteNote: this.handleDeleteNote

    }
    
    return (
      <AppContext.Provider value={(context)}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/folder/:folderId' component={FolderFilterFunction} />
        <Route path='/note/:noteId' render={(props)=> {
          return (
            <NoteFilterFunction match={props.match} history={props.history} goBack={() => props.history.push('/')}/>
          )
        }} />
        <Route component={NotFoundPage}/>
      </Switch>
      </AppContext.Provider>
    )
  }
}

export default App;