import React from 'react';
import Slider from 'react-slick';
import * as firebase from 'firebase';

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
  };

  componentWillReceiveProps() {
    
    let currentUID = this.props.currentUserId

    let scannedRef = firebase.database().ref(`/items-scanned/${currentUID}/`);
    console.log('John Was Here')
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
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      // centerMode: true,
      vertical: true,
      // variableHeight: true,
      // adaptiveHeight: true,
      verticalSwiping: true
    };
    return (
      <div className="carousel-container">
        <h5>Scanned Items</h5>
        <Slider {...settings}>
          {
            this.state.inProgress.map(item =>
              <div style={{height: 200}} onClick={() => {
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