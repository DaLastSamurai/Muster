//user collection list should
//show up on the left side and persist whenever user is logged in
import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials';
import SearchBar from '../helperElements/SearchBar';
import MyCollectionsList from './MyCollectionsList.jsx';
import NewCollectionsInput from './NewCollectionsInput.jsx';
import UserInfo from './UserInfo.jsx';

export default class MyCollections extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showInputForm : false,
    };
  }

  componentDidMount() {

  }

  render() {
    // console.log('input form toggle',this.state.showInputForm)
    return(
      <div>
      This is the left-side userbar
        <SearchBar/>
        <UserInfo user={this.props.user}/>
        <MyCollectionsList />
          <button type="button" className="btn btn-outline-secondary bg-primary" onClick={()=>{this.setState({showInputForm:!this.state.showInputForm})}}>
            New Collection
          </button>
          {this.state.showInputForm?(<NewCollectionsInput />):(<div/>)}
      </div>
    )
  }
}
