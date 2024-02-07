import React from 'react';
import'./banner.css'
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '/images/banner1.svg'

function Banner() {
  return (
   <div>
     <Carousel>
      <Carousel.Item style={{ backgroundImage: `url(${banner1})`, backgroundRepeat:'no-repeat', backgroundPosition:'cover'}}>
        {/* <ExampleCarouselImage text={banner1} /> */}
        <Carousel.Caption>
          <h3 className='banner-head'>Proudly Manufactured in India</h3>
          <p className='banner-para'>We are the first Emergency Exit / Egress Route Lighting Systems manufacturer to be an ISO 9001:2015 Certified Company in the fields of R & D, Manufacturing, Marketing and Maintenance in the country.</p>
          <button className='banner-btn'>KNOW MORE</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
    <div class="container text-center">
      <div class="row gx-4 ">
        <div class="col-3 mt-5 mb-5">
          <h2 class="box blue">AutoGlo</h2>
        </div>
        <div class="col-3 mt-5 mb-5">
          <h2 class="box green">Prolite</h2>
        </div>
        <div class="col-3 mt-5 mb-5">
          <h2 class="box blue">AutoGlo</h2>
        </div>
        <div class="col-3 mt-5 mb-5">
          <h2 class="box green">Prolite</h2>
        </div>
      </div>
    </div>
   </div>
  );
}

export default Banner;