import React from "react";
import "../Style/OrderPage.css";
import bin from "../images/bin.svg";

const OrderedProduct = ({ image, productName, price, quantity, removeFromCart }) => {
  const totalPrice = price * quantity;
  
  const handleRemoveFromCart = () => {
    console.log("Removing from cart");
    removeFromCart(); // Invoke removeFromCart function when the bin icon is clicked
  };
  
  return (
    <div className="orderedProductInfo">
      <img src={image} alt="product Image" className="productImg" />
      <div className="displayFlex">
        <p className="orderProductName">{productName}</p>
        <p className="orderProductName">{price} $</p>
        <p className="orderProductName">{quantity}</p>
        <p className="orderProductName">{totalPrice}$</p>
        <img
          src={bin}
          className="bin"
          alt="Remove"
          onClick={handleRemoveFromCart}
        />
      </div>
    </div>
  );
};

export default OrderedProduct;
