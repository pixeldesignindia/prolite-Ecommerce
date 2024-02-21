
import './delivery.css'
import Footer from '../../components/footer/Footer'
const Delivery = () => {
  return (
<>
          <section className="shipping">
        <div className="container shipping mt-5 mb-5">
            <div className="head">
                <h3>SHIPPING</h3>
            </div>
            <ul>
                <li>Most products carried are in stock and ready to ship but we advise our customers to kindly inquire
                    about your required quantity and product status for the ease in shipping.</li>
                <li>All orders are carefully inspected prior to shipment; upon receipt, please inspect your purchase and
                    notify us if any broken or missing parts are noticed via email with pictures within 5 days of
                    delivery. We will arrange for a prompt replacement.</li>
                <li>Minimum of 14 working days are required to manufacture and dispatch customized orders from our
                    warehouse. Shipping time will be extra depending on the mode of transport and destination</li>
                <li>No two items can be same in finish or in design as these items are handcrafted which adds to the
                    uniqueness of the product.</li>
                <li>Goods once sold cannot be returned or exchanged.</li>
            </ul>
        </div>
        
    </section>
    <Footer/>
    </>
  )
}

export default Delivery
