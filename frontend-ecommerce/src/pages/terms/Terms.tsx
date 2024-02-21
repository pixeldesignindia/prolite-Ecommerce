import './terms.css'
import Footer from '../../components/footer/Footer'
const Terms = () => {
  return (
    <section className="terms">
    <div className="container">
        <div className="term-con mb-5 mt-5">
            <h3 className="term-head">TERMS AND CONDITIONS</h3>
            <ul className="term-list">
                <li>The content of the pages of this website is for your general information and use only. It is
                    subject to change without notice.</li>
                <li>This website contains materials which are owned by Fos Lighting. This material includes but is
                    not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited
                    other than in accordance with the copyright notice, which forms part of these terms and
                    conditions.</li>
                <li>Unauthorized use of this website may give to a claim for damages and/or be a criminal offense.
                </li>
                <li>You may not create a link to this website from another website or document without any written
                    consent from Fos Lighting.</li>
                <li>The photographs, artwork, and information contained in this site are copyrighted and may not be
                    distributed, modified, reused, reposted, or otherwise used outside the scope of normal Web
                    browsing without the express written permission of Fos Lighting.</li>
            </ul>
        </div>
    </div>
    <Footer/>
</section>
  )
}

export default Terms
