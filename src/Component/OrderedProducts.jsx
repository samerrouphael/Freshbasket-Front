// import React from "react";
import "../Style/OrderPage.css";
import bin from "../images/bin.svg";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderedProduct = ({id, image, productName, price, quantity, removeFromCart }) => {
  const totalPrice = price * quantity;
  const [product, setProducts] = useState([]);

  // const handleRemoveFromCart = () => {
  //   console.log("Removing from cart");
  //   removeFromCart(); // Invoke removeFromCart function when the bin icon is clicked
  // };
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://fresh-basket.onrender.com/products/getAllProduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async () => {
    console.log(id)
    try {
      const response = await axios.delete(
        `https://fresh-basket.onrender.com/Products/deleteProductById/${id}`
      );

      getAllProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="orderedProductInfo">
      <img src={image} alt="product Image" className="productImg" />
      <div className="displayFlex">
        <p className="orderProductName">{productName}</p>
        <p className="orderProductName">{price} $</p>
        <p className="orderProductName">{quantity}</p>
        <p className="orderProductName">{totalPrice}$</p>
        {/* <img
          src={bin}
          className="bin"
          alt="Remove"
          onClick={handleRemoveFromCart}

        /> */}
        <div className="remove">
        <button
          type="button"
          className="remove-btn"
          onClick={ deleteProduct}
        >
          Remove
        </button>
        </div>
      </div>
    </div>
  );
};

export default OrderedProduct;
