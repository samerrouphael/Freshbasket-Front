import React from "react";
import '../Style/CustomerReview.css'
import customer1 from '../images/c1.jpeg'
import customer2 from '../images/c2.jpeg'
import customer3 from '../images/c3.jpeg'
const CustomerReview = () => {
  return (
    <div className="CustomerReview">
      <div className="titleContainer">
        <p className="Title">Satisfied Customers Are Our Best</p>
      </div>
      <div className="reviews-container">
        <div className="inside-review-container">
          <div className="review">
            <p className="review-text">
              “Some Customers review about our website, and their experience.
              More talk to add more words!”
            </p>
            <hr className="horizontal-line"/>
            <div className="customer-info">
                <img src={customer1} className="customer-image"/>
                <p className="customer-name"> Rasha Taher <br/> Customer</p>
            </div>
          </div>
          <div className="review">
            <p className="review-text">
              “Some Customers review about our website, and their experience.
              More talk to add more words!”
            </p>
            <hr className="horizontal-line"/>
            <div className="customer-info">
                <img src={customer2} className="customer-image"/>
                <p className="customer-name"> Sarah Ayoub <br/> Customer</p>
            </div>
          </div>
          <div className="review">
            <p className="review-text">
              “Some Customers review about our website, and their experience.
              More talk to add more words!”
            </p>
            <hr className="horizontal-line"/>
            <div className="customer-info">
                <img src={customer3} className="customer-image"/>
                <p className="customer-name"> Samer Rouphael <br/> Customer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;