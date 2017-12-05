//user collection list should
//show up on the left side and persist whenever user is logged in
import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials';
import SearchBar from '../helperElements/SearchBar';
import MyCollectionsList from './MyCollectionsList.jsx';
import NewCollectionsInput from './NewCollectionsInput.jsx';
import UserInfo from './UserInfo.jsx';
import AddItems from '../addItems/addItems';

import { withRR4 } from 'react-sidenav';
import { Link } from 'react-router-dom'

const SideNav = withRR4();

export default class MyCollections extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showInputForm : false,
    };
  }

  render() {
    // console.log('print this user', this.props.user.uid)
    // console.log('input form toggle',this.state.showInputForm)
    // console.log('>>>',this.props.addNewCollection)
    return(
      <div style={{width: 220, float: 'left', margin: '1.5%'}} className="container-fluid">

      <SideNav>
        <Link to={`/profile/${this.props.user.uid}`}>
          <UserInfo user={this.props.user} clickFunction={() => {}}/>
        </Link>
      </SideNav>

      <SideNav>
        <button type="button" className="btn btn-outline-secondary bg-primary" onClick={()=>{this.setState({showInputForm:!this.state.showInputForm})}}>
          New Collection
        </button>
          {this.state.showInputForm?(<NewCollectionsInput addNewCollection={this.props.addNewCollection}/>):(<div/>)}
      </SideNav>
      
      <Link to={'/addItems/'}>
          <button type="button" className="btn btn-outline-secondary bg-primary">Add Items</button>
      </Link>
      
      <SideNav>
        <SearchBar search={(input) => 
          { this.props.searchMyCollections(input) }} />
      </SideNav>

        <MyCollectionsList />
      
      </div>
    )
  }
}
