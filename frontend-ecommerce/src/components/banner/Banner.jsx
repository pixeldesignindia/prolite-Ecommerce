import Carousel from 'react-bootstrap/Carousel';
import banner1 from '/images/banner1.svg'

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        {/* <ExampleCarouselImage text={banner1} /> */}
        <img src={banner1} alt="" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;