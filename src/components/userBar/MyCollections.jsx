//user collection list should
//show up on the left side and persist whenever user is logged in
import React from 'react';
import { firebaseAuth, rootRef, collection, category, item, users } from '../../../config/firebaseCredentials';
import { addNewCollection } from './writeNewCollectionHelpers'
// import SearchBar from '../helperElements/SearchBar';
import MyCollectionsList from './MyCollectionsList.jsx';
import NewCollectionsInput from './NewCollectionsInput.jsx';
import UserInfo from './UserInfo.jsx';
import AddItems from '../addItems/addItems';
import ChatRoomList from '../messaging/ChatRoomList'

// import { withRR4 } from 'react-sidenav';
import { Link } from 'react-router-dom'

// const SideNav = withRR4();

export default class MyCollections extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showInputForm: false,
    };

    this.handleAddCollection = this.handleAddCollection.bind(this);
    this.addNewCollection = addNewCollection.bind(this);
    this.toggleInputForm = this.toggleInputForm.bind(this);
  }

  toggleInpurForm() {
    this.setState({showInputForm:!this.state.showInputForm})
  }

  handleAddCollection() {
    this.props.getUserCollection()
  }

  toggleInputForm() {
    this.setState({showInputForm:!this.state.showInputForm})
  }

  render() {
    return(
      <div className="navbar-mycollection">
        <ul className="collectionNav">
          <li>
            <button type="button" className="btn btn-outline-secondary bg-primary"
            onClick={() => { this.toggleInputForm() }}>
            New Collection
            </button>
            {this.state.showInputForm ?
            (<NewCollectionsInput
            toggleInputForm= { this.toggleInputForm }
            getUserCollection={this.props.getUserCollection}
            addNewCollection={this.addNewCollection}
            handleAddCollection={this.handleAddCollection} />) :
            (<div />)}
          </li>
          {/* <Link to='/manageinventory'>
            <button title='Books' clickFunction={() => { }} >Books</button>
          </Link>
          <Link to='/trade'>
            <button title='Trade' clickFunction={() => { }}>Trade</button>
          </Link>
          <Link to={'/addItems/'}>
            <button type="button" className="">Add</button>
          </Link>
          <Link to="/">
            <button title='Logout' clickFunction={() => { firebaseAuth().signOut() }} >Logout</button>
          </Link> */}
          <li>
            <MyCollectionsList collections={this.props.collections} />
          </li>
        </ul>
      </div>
    )
  }
}