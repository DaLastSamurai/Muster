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

import { withRR4 } from 'react-sidenav';
import { Link } from 'react-router-dom'

const SideNav = withRR4();

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
      <div className="container-fluid">
        <SideNav>
          <Link to={`/profile/${this.props.user.uid}`}>
            <UserInfo user={this.props.user} clickFunction={() => {}}/>
          </Link>
        </SideNav>
        <SideNav>
          <button type="button" className="btn btn-outline-secondary bg-primary"
            onClick={()=>{this.toggleInputForm()}}>
            New Collection
          </button>
            {this.state.showInputForm ?
              (<NewCollectionsInput
                toggleInputForm={this.toggleInputForm}
                getUserCollection={this.props.getUserCollection}
                addNewCollection={this.addNewCollection}
                handleAddCollection={this.handleAddCollection} />) :
              (<div/>)}
        </SideNav>
        <Link to={'/addItems/'}>
          <button type="button" className="btn btn-outline-secondary bg-primary">Add Items</button>
        </Link>
        <SideNav>
          {/*<SearchBar search={(input) => { this.props.searchMyCollections(input) }} />*/}
        </SideNav>
        <SideNav>

        {(Object.keys(this.props.collectionList).length > 0)
          ? <MyCollectionsList
            collectionList={this.props.collectionList}
            />
          : <h5>add collection</h5>}
        </SideNav>

        <SideNav>
          <ChatRoomList />
        </SideNav>
      </div>
    )
  }
}
