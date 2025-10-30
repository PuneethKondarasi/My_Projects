import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'; // npm install react-icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h4><b>Hastara Clothing</b></h4>
          <p>"WEAR THE STORY”<br/>
          SUSTAINABLE FABRICS and HAND EMBROIDERY! <br/>
          To the conscious shoppers by the conscious makers!
          </p>
          <Link to="/admin">Admin Login</Link>
        </div>
        <div className="footer-right">
          <h4>Follow Us on</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/hastara.clothing?igsh=MTljYWw5Z3F1amtveQ==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} <b>Hastara Clothing. All Rights Reserved.</b>
      </div>
    </footer>
  );
};
export default Footer;
