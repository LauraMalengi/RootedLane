import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Partners</h4>
          <p>RootedLane is partnered with various brands to bring you the best in fashion.</p>
          <a href="https://www.mrp.com" target="_blank" rel="noopener noreferrer">Mr Price</a><br />
          <a href="https://www.identitystores.co.za" target="_blank" rel="noopener noreferrer">Identity</a><br />
          <a href="https://www.legit.co.za" target="_blank" rel="noopener noreferrer">LEGiT</a><br />
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="https://www.facebook.com/rootedlane" target="_blank" rel="noopener noreferrer">Facebook</a><br />
          <a href="https://wa.me/27678000672" target="_blank" rel="noopener noreferrer">WhatsApp</a><br />
          <a href="https://www.youtube.com/rootedlane" target="_blank" rel="noopener noreferrer">YouTube</a><br />
          <a href="https://www.pinterest.com/rootedlane" target="_blank" rel="noopener noreferrer">Pinterest</a><br />
        </div>

        <div className="footer-section">
          <h4>Address</h4>
          <p>
            Cismon <br />
            Windsor West <br />
            Louise and Knight <br />
            Mbombela, South Africa
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>WhatsApp: <a href="https://wa.me/27678000672">067 800 0672</a></p>
          <p>Phone: <a href="tel:+27787148112">+27 78 714 8112</a> / <a href="tel:+27793952197">079 395 2197</a></p>
          <p>Email: <a href="mailto:rootedlane@gmail.com">rootedlane@gmail.com</a></p>
          <p>Email: <a href="mailto:patrickmalengi3@gmail.com">patrickmalengi3@gmail.com</a></p>
        </div>

        <div className="footer-section">
          <h4>Site Information</h4>
          <p>
            RootedLane is a South African online clothing store that specializes in traditional and modern fashion. We offer a wide range of clothing for all occasions.
          </p>
          <a href="/terms">Terms and Conditions</a><br />
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 RootedLane. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;