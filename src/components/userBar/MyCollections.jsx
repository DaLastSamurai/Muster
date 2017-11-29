//user collection list should
//show up on the left side and persist whenever user is logged in
import React from 'react';
import { firebaseAuth } from '../../../config/firebaseCredentials';
import SearchBar from '../helperElements/SearchBar';
import MyCollectionsList from './MyCollectionsList.jsx';
import NewCategoryInput from './NewCategoryInput.jsx';

export default class MyCollections extends React.Component {
  constructor(){
    super();
    this.state={};
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
      This is the left-side userbar
        <SearchBar/>
        <MyCollectionsList />
        <NewCategoryInput />
      </div>
    )
  }
}
