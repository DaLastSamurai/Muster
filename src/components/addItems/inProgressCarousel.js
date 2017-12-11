import React from 'react';
import Slider from 'react-slick';
import InProgressEntry from './inProgressEntry';

class InProgressCarousel extends React.Component {
  render() {
    const settings = {
      className: 'center',
      infinite: false,
      centerPadding: '0px',
      dots: true,
      slidesToShow: 5,
      focusOnSelect: true,
      afterChange: function (index) {
        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
      }
    };
    return (
      <div className="carousel-container">
        <Slider { ...settings }>
          <InProgressEntry />
        </Slider>
      </div>
    );
  }
}; 

export default InProgressCarousel;
