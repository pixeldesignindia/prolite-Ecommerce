import './privacy.css'
import Footer from '../../components/footer/Footer'
const Privacy = () => {
  return (
    <section className="privacy-policy">
    <div className="container mt-5 mb-5">
        <h3 className="privacy-policy-head">PRIVACY POLICY</h3>
        <div className="privacy-policy-para pt-5">
            <p>We want you to feel comfortable and secure while using our website that why we are committed to
                protect your personal privacy.</p>
            <ul className="disc-list text-muted mt-3">
                <li>Creating an account with us you are consenting to the collection of certain data like your name,
                    address, email and phone numbers.</li>
                <li>Fos Lighting will only provide your name, phone number and delivery address to the transport
                    company to deliver your order.</li>
                <li>We will not share, sell or rent your personal details to any third party.</li>
                <li>We do not store you credit card details at our end. Your credit card details are store in highly
                    secure servers.</li>
            </ul>
        </div>
        <p>We have humble contracts with the CC Avenue and PayPal which provides certified payment gateways to
            ensure you get the best in industry online security. All payment transactions implement
            industry-standard Verisign's 128 bit SSL (Standard Sockets Layer) Technology, the maximum level of data
            encryption possible on Internet.</p>
    </div>
    <Footer/>
</section>
  )
}

export default Privacy
