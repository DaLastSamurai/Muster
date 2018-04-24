import React from 'react';
import AddItems from '../addItems/AddItems';
import { Link } from 'react-router-dom';

class InventoryCollectionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem() {
    let answer = confirm('are you sure?');
    if (answer === true) {
      console.log('asdasd', this.props.itemId);
      this.setState({ display: false });
      this.props.deleteItem(this.props.itemId);
    }
  }

  render() {
    return this.props.itemInCol ? (
      <div className={`${this.props.itemId} inventory-item ${this.state.display ? null : 'inventory-delete'}`}>
        <div className="manage-item-image">
          <img
            src={
              this.props.itemInCol.images
                ? this.props.itemInCol.images[0]
                : 'https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
            }
          />
        </div>
        <p className="manage-item-itemtitle">{this.props.itemInCol.title}</p>
        <div className="manage-item-decoline" />
        <div className="manage-item-itemedit">
          <p onClick={() => this.handleDeleteItem()} type="button">
            x
          </p>
          <Link to={'/addItems/'}>
            <p
              onClick={() => {
                this.props.editItem(this.props.itemId);
              }}
              type="button"
            >
              edit
            </p>
          </Link>
        </div>
      </div>
    ) : (
      <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
    );
  }
}

export default InventoryCollectionEntry;
