import React from 'react';
import LinkButton from '../helperElements/LinkButton.js'

export default class NewCollectionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      collectionName:"",
      category:""
    };
  }
  render() {
    return(
      <form onSubmit={(e)=>{ e.preventDefault()
        console.log('adding a new collection')
      }}>
        <div className="category-input">
        <input
          type="text"
          placeholder="Collection Name"
          onChange={(e)=>{this.setState({collectionName:e.target.value})}}
        />
        <input
          type="text"
          placeholder="Category"
          onChange={(e)=>{this.setState({category:e.target.value})}}
        />
        </div>
        <button type="submit"> + </button>
      </form>
    )
  }
}
