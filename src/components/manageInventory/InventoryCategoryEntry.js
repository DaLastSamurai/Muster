import React from 'react';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class InventoryCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
    }
    this.getCategoryImage = this.getCategoryImage.bind(this);
  }
 
  componentWillMount() {
    this.getCategoryImage()
  }

  getCategoryImage() {
    new Promise((resolve, reject) => {
      collection.child(this.props.colKey).child('itemId').on('value', (snap) => {
        if (snap.val()) {
          resolve(Object.keys(snap.val())[0])
        }
      })
    })
    .then((itemId) => {
      item.child(itemId).child('images').on('value', (snap) => {
        this.setState({image: snap.val()})
      })
    })
  }
  
  render() {
    return(
        this.props.collection
        ? <div className={`${this.props.colKey} inventory-item`}>
            <div className="manage-item-image">
              <img src= {this.state.image ? this.state.image : 'https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'}/>
            </div>
            <p className="manage-item-itemtitle">{this.props.collection.name}</p>
            <div className="manage-item-decoline">
            </div>
          </div> 
        : <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' />
    )
  }
}

export default InventoryCategoryEntry;