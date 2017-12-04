import React from 'react';
import LinkButton from '../helperElements/LinkButton.js'


export default class NewCollectionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      collectionName:"",
      category:""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    this.props.addNewCollection(this.state.collectionName, this.state.category);
  }

  render() {
    return(
      <form onSubmit={(e)=>{
        e.preventDefault();
        this.handleSubmit(e);
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
