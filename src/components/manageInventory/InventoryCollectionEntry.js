import React from 'react';
import AddItems from '../addItems/addItems';
import { Link } from 'react-router-dom';


class InventoryCollectionEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
 
  componentDidMount() {
  }
  
  render() {
    return(
      this.props.itemInCol ? 
      <div className={`${this.props.itemId}`}>
        <img src= {this.props.itemInCol.imageUrl ? this.props.itemInCol.imageUrl : 'https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'}/>
        <div>{this.props.itemInCol.name}</div>
        <button onClick={() => this.props.deleteItem(this.props.itemId)} type="button">x</button>

        <Link to={'/addItems/'}>
          <button onClick={() => {
            this.props.editItem(this.props.itemId)
          }
          } type="button">edit</button>
        </Link>

      </div> :
      <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
    )
  }
}

export default InventoryCollectionEntry;