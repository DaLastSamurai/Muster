import React from 'react';
import Slider from 'react-slick';
import * as firebase from 'firebase';

class InProgressCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUID: '',
      inProgress: []
    };
    this.populateFields = this.populateFields.bind(this);
  };

  populateFields(item) {
    this.props.setItemState(item);
  };

  // removeFromInprogress() {
  //   let inProgressRef = firebase.database().ref('/items-scanned');
  //   inProgressRef.update()
  // };

  componentWillReceiveProps() {
    
    let currentUID = this.props.currentUserId

    let scannedRef = firebase.database().ref(`/items-scanned/${currentUID}/`);

    scannedRef.on("value", (snapshot) => {
      let grabItems = Object.keys(snapshot.val()).map((k, i) => {
        return {
          uid: currentUID,
          title: snapshot.val()[k].title,
          images: snapshot.val()[k].images,
          notes: snapshot.val()[k].notes,
          upc: snapshot.val()[k].upc,
          onlinePrice: snapshot.val()[k].onlinePrice,
          storeLinks: snapshot.val()[k].storeLinks,
          subject: snapshot.val()[k].subject
        }
      })

      this.setState({
        inProgress: grabItems
      });

    }, (error) => { console.error(error) }
    );
  }

  render() {

    const settings = {
      dots: false,
      // infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true
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
                <img src={item.images[0]} />
                <h5>{item.title}</h5>
              </div>)
          }
        </Slider>
      </div>
    );
  }
};

export default InProgressCarousel;