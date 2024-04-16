import React from 'react';
import footer from "../../assets/images/footer.png"
import '../footer/Footer.scss'
function Footer(props) {
    return (
        <div className='footer-container'>
            <img src={footer} alt="footer" width="50%" />
        </div>
    );
}

export default Footer;