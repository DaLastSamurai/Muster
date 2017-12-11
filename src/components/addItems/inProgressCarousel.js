import React from 'react';
import Slider from 'react-slick';
import * as firebase from 'firebase';
import UserInfo from '../userBar/UserInfo.jsx';


class InProgressCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: []
    };
    this.populateFields = this.populateFields.bind(this);
  };

  populateFields(item) {
    this.props.setItemState(item);
    //take the item and pass it to addItems
    //
  };

  // removeFromInprogress() {
  //   let inProgressRef = firebase.database().ref('/items-scanned');
  //   inProgressRef.update()
  // };

  componentDidMount() {
    let inProgressRef = firebase.database().ref('/items-scanned');

    inProgressRef.on("value", (snapshot) => {
      let currentUID = firebase.auth().currentUser.uid;

      let grabIdName = Object.keys(snapshot.val()).map((k, i) => {
        return {
          id: Object.keys(snapshot.val())[i],
          name: snapshot.val()[k].name,
          imageUrl: snapshot.val()[k].imageUrl,
          location: snapshot.val()[k].location,
          collectionId: snapshot.val()[k].collectionId,
          uid: snapshot.val()[k].uid
        }
      })
        .filter(collection => collection.uid.includes(currentUID));

      this.setState({
        inProgress: grabIdName
      });

    }, (error) => { console.error(error) }
    );
  }

  render() {
    console.log('this.state', this.state)
    const settings = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      dots: true,
      speed: 500
    };
    return (
      <div className="carousel-container">
      <h5>Scanned Items</h5>
        <Slider {...settings}>
          {
            this.state.inProgress.map(item =>
              <div onClick={() => {
                this.populateFields(item);
              }}>
                <img src={item.imageUrl}/>
                <h5>{item.name}</h5>
              </div>)
          }
        </Slider>
      </div>
    );
  }
}; 

export default InProgressCarousel;
