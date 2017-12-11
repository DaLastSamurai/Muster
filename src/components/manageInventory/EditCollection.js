import React from 'react';

class EditCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  }

  handleChange(event) {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  handleSubmit() {}

  render() {console.log('>>>>>>>>',this.props.collection)
    return(
      <div>
          <label>Name</label>
          <input 
            type="text"
            name="name"
            placeholder={`${this.props.collection.name}`}
            onChange={this.handleChange} />
          <label>public</label>
          <div>
            <input type="checkbox" id="public" name="public" value="public"  />
            <p for="public">Coding</p>
          </div>
          <button>submit change</button>
      </div>
    )
  }
}

export default EditCollection;