
import { Placeholder, PlaceholderButton } from 'react-bootstrap';
// import cart from '/images/addToCart.svg'
import './skeleton.css'


const SkeletonLoading = () => {


  return (
    <div className="cardC">
      <div className="img center" style={{cursor:'pointer'}}>
        {/* <img src={`${server}/${displayPhoto[0]}`} alt={name} /> */}
      </div>
      <div className="card-body">
        <p className="card-title"><Placeholder  animation="glow">
        <Placeholder xs={4} />
      </Placeholder></p>
<p ><Placeholder  animation="glow">
        <Placeholder xs={4} />
      </Placeholder></p>
        
        <p className="card-text"><Placeholder  animation="glow">
        <Placeholder xs={4} />
      </Placeholder></p>
        {/* {category && <p>Category: {category}</p>} */}
        <button className="add-cart"></button>
      </div>
    </div>
  );
};

export default SkeletonLoading;
