
import checkout from '/images/checkout.svg'
import delivery from '/images/delivery.svg'
import premium from '/images/premium.svg'
import "./Brand.css"
const Brand = () => {
  return (
    <div>
<section className="why-us">
      <div className="container pt-5">
        <h2 className="heading text-center">Why Choose Us</h2>
      </div>

      <div className="container brand-box" >
        <div className="row gx-4 rowBlock">
          <div className="col-4 mt-5 mb-5 w100">
            <div className="three">
              <img src={checkout} alt="" />
              <h2 className="Why">Premium Brands</h2>
            </div>
          </div>
          <div className="col-4  mt-5 mb-5 w100">
            <div className="three">
              <img src={delivery} alt="" />
              <h2 className="Why">Fast Delivery</h2>
            </div>
          </div>
          <div className="col-4  mt-5 mb-5 w100">
            <div className="three">
              <img src={premium} alt="" />
              <h2 className="Why">Secure Checkout</h2>
            </div>
          </div>

        </div>
      </div>
    </section>

    </div>
  )
}

export default Brand