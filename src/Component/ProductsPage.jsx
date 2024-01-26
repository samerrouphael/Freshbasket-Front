import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import "../Style/ProductsPage.css";
import ProductComponent from "./ProductsComponent";
import ProductinPage from "./ProductinPage";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [noProductsMessage, setNoProductsMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async (category = "") => {
    try {
      let url = "https://fresh-basket.onrender.com/products/getAllProduct";
      if (category) {
        url = `https://fresh-basket.onrender.com/products/getProductByCategory/${category}`;
      }

      const response = await axios.get(url);
      const modifiedProducts = response.data.map((product) => ({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
      }));
      setProducts(modifiedProducts);

      if (modifiedProducts.length === 0) {
        setNoProductsMessage("No products in this category are added yet");
      } else {
        setNoProductsMessage("");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fresh-basket.onrender.com/category/getAllCategories"
      );
      const data = await response.json();
      setCategories(data); // Assuming the response returns an array of category objects
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getProductByName = async () => {
    try {
      const response = await axios.get(
        `https://fresh-basket.onrender.com/products/getProductByName/${searchTerm}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    fetchProducts(selectedValue);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="ProductsPage">
      <MenuBar />
      <div className="selectBar">
        <select
          className="selectCategory"
          id="selectCategory"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <div className="search">
          <input type="text" className="inputProduct" placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-bt" onClick={getProductByName}>
            Search
          </button>
        </div>
      </div>
      <div className="allProducts">
        {/* Display products or message */}
        {noProductsMessage ? (
          <p>{noProductsMessage}</p>
        ) : (
          products.map((product, index) => (
            <ProductinPage
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))
        )}
      </div>
      <Footer />

      <div className="product-modal"></div>
    </div>
  );
};

export default ProductsPage;
