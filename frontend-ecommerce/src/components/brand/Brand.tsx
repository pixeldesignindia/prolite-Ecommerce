
import premium from '/images/checkout.svg'
import delivery from '/images/delivery.svg'
import checkout  from '/images/premium.svg'
import "./Brand.css"
import leftLine from '/images/lLine.svg'
import rightLine from '/images/rLine.svg'

const Brand = () => {
  return (
    <div>
<section className="why-us">
      <div className="container pt-5">
      <div className="d-flex align-items-center justify-content-center gap-4">
        <img src={leftLine} alt="" /> <h3 className="heading">Why Choose Us ?</h3> <img src={rightLine} alt="" />
        </div>
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