import React from 'react'
import './footer.css'
const Footer = () => {
    return (
        <div>
            <footer id="footer-main">
    

      <div className="container first">
        <div className="row gx-5">
          <div className="col-4 pt-5">
            <h2 className="left-head">Get Featured On Our Website</h2>
            <button>Enquiry Now</button>
          </div>
          <div className="col-4 pt-5">
            <h2 className="f-head">The Company</h2>
            <ul className="ft-list">
              <li><a href="">Shop</a></li>
              <li><a href="">About Us</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </div>
          <div className="col-4 pt-5">
            <h2 className="f-head">Policy</h2>
            <ul className="ft-list">
              <li><a href="">Shipping Policy</a></li>
              <li><a href="">Store Policy</a></li>
              <li><a href="">Payment Methods</a></li>
              <li><a href="">Teams & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>

 
  
      <div className="container secondary-footer">
        <div className="row">
          <div className="col-6">
            <div className="second-left">
              <p> © Copyrights 2024, Prolite Auotglo Ltd. All rights reserved</p>
            </div>
          </div>
          <div className="col-6">
            <div className="second-right">
              <p> Design & Developed By - </p>
              <a href=""> Pixel Design India </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
        </div>
    )
}

export default Footer
