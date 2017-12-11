import React from 'react';
import Slider from 'react-slick';
import InProgressEntry from './inProgressEntry';
import * as firebase from 'firebase';
import UserInfo from '../userBar/UserInfo.jsx';


class InProgressCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: []
    };
    // this.handleSomething = this.handleSomething.bind(this);
  };

  componentDidMount() {
    let collectionRef = firebase.database().ref('/items-scanned');

    collectionRef.on("value", (snapshot) => {
      let currentUID = firebase.auth().currentUser.uid;

      let grabIdName = Object.keys(snapshot.val()).map((k, i) => {
        return {
          id: Object.keys(snapshot.val())[i],
          name: snapshot.val()[k].name,
          imageUrl: snapshot.val()[k].imageUrl,
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
              <div>
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
