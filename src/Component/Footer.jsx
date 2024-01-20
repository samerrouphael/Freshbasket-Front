import React from "react";
import "../Style/Footer.css";
import logo from "../images/logo.jpg";
import facebook from "../images/facebook.svg";
import instagram from "../images/instagram.svg";
import twitter from "../images/twitter.svg";
import applestore from "../images/apple-store.svg";
import playstore from "../images/playstore.svg";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer-container">
        <div className="footer-content">
          <img src={logo} className="footer-logo" />
          <p>
            We always make our customer happy by providing as many choises as
            possible.
          </p>
        </div>
        <div className="footer-content">
          <p className="footer-sub"> Fresh Basket</p>
          <ul className="footer-ul">
            <li className="footer-li">Branches</li>
            <li className="footer-li">Delivery coverage</li>
            <li className="footer-li">Careers</li>
            <li className="footer-li">Contact Us</li>
          </ul>
        </div>
        <div className="footer-content">
          <p className="footer-sub"> Download our Mobile App </p>
          <div className="footer-media"> 
          <img src={applestore} className="footer-logo" />
          <img src={playstore} className="footer-logo" />
          
          </div>
        </div>
        
        <div className="footer-content">
          <p className="footer-sub"> Stay conneted</p>
          <div className="footer-media"> 
          <img src={facebook} className="footer-logo" />
          <img src={instagram} className="footer-logo" />
          <img src={twitter} className="footer-logo" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
