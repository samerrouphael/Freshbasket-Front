import React, { useState, useEffect } from "react";
import "../Style/LatestProducts.css";
import ProductinPage from "./ProductinPage";
import axios from "axios";
import { Link } from 'react-router-dom';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "https://fresh-basket.onrender.com/products/getAllProduct"
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);



  return (
    <div className="latestProducts">
      <div className="titleContainer">
        <p className="Title">Our Products</p>
      </div>
      <div className="product-slider">
        <div className="slider-wrapper"
          style={{ transform: `translateX(-${startIndex * 33.33}%)` }}
        >
          {products.slice(startIndex, startIndex + 3).map((product) => (
            <ProductinPage
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}

        </div>

      </div>
      <div className="show">
        {' '}
        <button className="showmore">

          <Link to="/productspage">Show more</Link></button>
      </div>
    </div>
  );
};

export default LatestProducts;