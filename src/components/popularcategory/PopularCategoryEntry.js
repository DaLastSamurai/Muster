import React from 'react';

class PopularCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('popcat id',this.props.category)
    return(
      <div className='popular-category' key={this.props.id}>
        <img src={this.props.category[1].pictureurl}/>
        <h4>{this.props.category[0]}</h4>
      </div>
    )
  }
}

export default PopularCategoryEntry;
