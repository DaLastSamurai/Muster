import React from 'react';
import Slider from 'react-slick';
import InProgressEntry from './inProgressEntry';

class InProgressCarousel extends React.Component {
  render() {
    const settings = {
      className: 'center',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      swipeToSlide: true,
      afterChange: function (index) {
        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
      }
    };
    return (
      <Slider { ...settings }>
        <InProgressEntry />
      </Slider>
    );
  }
}; 

export default InProgressCarousel;
