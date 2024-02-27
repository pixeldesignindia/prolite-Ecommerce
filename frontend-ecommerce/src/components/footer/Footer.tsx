
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () => {
    return (
        <div className='no-print'>
            <footer id="footer-main">
      <div className="container first">
        <div className="row">
          <div className="col-4 pt-5">
            <h2 className="left-head">Get Featured On Our Website</h2>
            <button>Enquiry Now</button>
          </div>
          <div className="col-4 pt-5">
            <h2 className="f-head">The Company</h2>
            <ul className="ft-list">
              <li><Link to="">Shop</Link></li>
              <li><Link to="">About Us</Link></li>
              <li><Link to="">Contact</Link></li>
            </ul>
          </div>
          <div className="col-4 pt-5">
            <h2 className="f-head">Policy</h2>
            <ul className="ft-list">
              <li><Link to={"/delivery"}>Shipping Policy</Link></li>
              <li><Link to={"/privacy"}>Store Policy</Link></li>
              <li><Link to={"/payment"}>Payment Methods</Link></li>
              <li><Link to={"/terms"}>Teams & Conditions</Link></li>
              <li><Link to={"/refund"}>Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container secondary-footer">
        <div className="row res-col-center">
          <div className="col-6 w100">
            <div className="second-left">
              <p> © Copyrights 2024, Prolite Auotglo Ltd. All rights reserved</p>
            </div>
          </div>
          <div className="col-6 w100">
            <div className="second-right">
              <p> Design & Developed By - <Link to=""> Pixel Design India </Link> </p>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
        </div>
    )
}

export default Footer
