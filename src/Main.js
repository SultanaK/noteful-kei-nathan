import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import STORE from './dummy-store';
import Notes from './Notes';
import FolderSidebar from './FolderSidebar'
import AppContext from './AppContext'
class Main extends Component {
  /* constructor(props) {
    super(props);
    this.state = {
      folders: STORE.folders,
      notes: STORE.notes
    };
  } */
 static contextType = AppContext;


  render() {
    console.log(this.context)
    return (
      <AppContext.Consumer>
      {()=>
        <div className='Mainpage'>
                <header className="header">
                  <Link to='/'>
                    <h1>Noteful</h1>
                  </Link>
                </header>
              <div className="container">
                  <div className='sidebar'>
                    <FolderSidebar folders={this.context.folders}/>
                  </div>
                  <main className='main'>
                    <Notes notes={this.context.notes} />
                  </main>
                </div>
        </div>
      }      
      
             
      </AppContext.Consumer>
    )
  }
}

export default Main;