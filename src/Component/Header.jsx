import React from "react";
import MenuBar from "./MenuBar";
import "../Style/Header.css";
import smallbusiness from  "../images/2.gif";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header-container">
                <MenuBar />
                <div className="rowFlex">
                    <div className="inside-header-container">
                        <p className="bigText">
                            Grocery shopping is now online
                        </p>
                        <p className="smallText">
                            Fresh Basket is a discount concept for Fast-moving consumer goods retail where the consumers find all their basic shopping needs at cheapest price in the market.
                        </p>
                        <div className="show">
        {' '}
        <button className="showmore">

          <Link to="/productspage">Shop Now</Link></button>
      </div>
                    </div>
                    <div className="inside-header-container">
                        <img src={smallbusiness} className="small-business" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;  