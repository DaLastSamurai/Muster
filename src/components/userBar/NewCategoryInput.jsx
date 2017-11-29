import React from 'react';
import LinkButton from '../helperElements/LinkButton.js'

export default class NewCategoryInput extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }
  render() {
    return(
      <form onSubmit={LinkButton}>
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
