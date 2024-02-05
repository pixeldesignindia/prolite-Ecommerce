import React from 'react';
import'./banner.css'
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '/images/banner1.svg'

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        {/* <ExampleCarouselImage text={banner1} /> */}
        <img src={banner1} alt="" />
        <Carousel.Caption>
          <h3>Proudly Manufactured in India</h3>
          <p>We are the first Emergency Exit / Egress Route Lighting Systems manufacturer to be an ISO 9001:2015 Certified Company in the fields of R & D, Manufacturing, Marketing and Maintenance in the country.</p>
          <button className='banner-btn'>KNOW MORE</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;