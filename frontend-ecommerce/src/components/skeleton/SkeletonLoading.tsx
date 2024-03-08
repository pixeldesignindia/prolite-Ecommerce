
import { Placeholder, PlaceholderButton } from 'react-bootstrap';
// import cart from '/images/addToCart.svg'
import './skeleton.css'


const SkeletonLoading = () => {


  return (
    <div className="cardC">
      <div className="img center" style={{cursor:'pointer'}}>
      <div ><Placeholder  animation="glow">
        <Placeholder xs={12} />
      </Placeholder></div>
      </div>
      <div className="card-body">
        <p className="card-title"><Placeholder  animation="glow">
        <Placeholder xs={12} />
      </Placeholder></p>
<p ><Placeholder  animation="glow">
        <Placeholder xs={8} />
      </Placeholder></p>
<p ><Placeholder  animation="glow">
        <Placeholder xs={7} />
      </Placeholder></p>
        
        <p className="card-text"><Placeholder  animation="glow">
        <Placeholder xs={6} />
      </Placeholder></p>
        {/* {category && <p>Category: {category}</p>} */}
        <button className="add-cart mt-3" style={{padding:"1rem"}}></button>
      </div>
    </div>
  );
};

export default SkeletonLoading;
