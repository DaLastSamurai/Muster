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
    scannedRef.on("value", (snapshot) => {
      let grabItems = Object.keys(snapshot.val()).map((k, i) => {
        return {
          id: k,
          uid: currentUID,
          title: snapshot.val()[k].title,
          images: snapshot.val()[k].images || ['https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'],
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
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      vertical: true,
      verticalSwiping: true
    };
    return (
      <div className="additems-carousel">
        <h5>Scanned Items</h5>
        <Slider {...settings}>

          {
            this.state.inProgress.map(item =>
              <div style={{height: 200}} onClick={() => {
                this.populateFields(item);
              }}>
                <img className="additems-carousel-img" src={item.images[0]} />
                <h5>{item.title}</h5>
              </div>)
          }
        </Slider>
      </div>
    );
  }
};

export default InProgressCarousel;