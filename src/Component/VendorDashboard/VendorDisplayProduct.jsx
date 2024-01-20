import "../../Style/VendorInfo.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
const VendorDisplayProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setselectedProduct] = useState(null);
  const vendorName= localStorage.getItem('vendorName')
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/getPoductByVendorName/${vendorName}`
);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (vendor) => {
    setselectedProduct(vendor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setselectedProduct(null);
  };
  const handleUpdateSubmit = () => {
    if (selectedProduct) {
      // Perform the update operation using selectedProduct data
      axios
        .put(
          `http://localhost:8000/products/updateProductById/${selectedProduct._id}`,
          selectedProduct
        )
        .then((response) => {
          console.log(response.data);
          getAllProducts(); // Refresh the vendor list after update
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const getProductByName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/getProductByName/${searchTerm}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/products/deleteProductById/${productId}`
      );
      getAllProducts();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/category/getAllCategories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; 
        setselectedProduct({
          ...selectedProduct,
          image: base64Image, 
        });
        setImagePreview(base64Image);
      };
      reader.readAsDataURL(file); 
    }
  };
  
  useEffect(() => {
    fetchCategories();
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="product">
        <p className="order-title">Product List</p>
        <div className="enter-product">
          <input
            type="text"
            className="vendorlogin-input"
            placeholder="Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="userLogin-btn" onClick={getProductByName}>
            Search
          </button>
        </div>

        <div className="table1">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Vendor Name</th>
                <th>Image</th>
                <th>Quantity</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.vendorName}</td>
                  <td>
                    <img
                      src={product.image}
                      alt="Product Image"
                      className="product-image"
                    />
                  </td>
                  <td> {product.quantity}</td>
                  <td>
                    <div className="button-container">
                      <button
                        type="button"
                        className="submitbt"
                        onClick={() => handleUpdate(product)} // Pass the vendor object to handleUpdate
                      >
                        Update Info
                      </button>
                      <button
                        type="button"
                        className="productbtn-delete"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete Product
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && selectedProduct && (
        <div className="updateModal" id="updateModal">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <div className="product-input-container">
            <p className="product-label"> Product Name</p>
            <input
              type="text"
              className="product-input"
              value={selectedProduct.name || ""}
              onChange={(e) =>
                setselectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <p className="product-label"> Description</p>
            <textarea
              className="product-input"
              value={selectedProduct.description || ""}
              onChange={(e) =>
                setselectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />

            <p className="product-label"> Price</p>
            <input
              type="number"
              className="product-input"
              value={selectedProduct.price || ""}
              onChange={(e) =>
                setselectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
            />
            <p className="product-label"> Category</p>
            <select className="selectCategory" id="selectCategory">
              <option value={selectedProduct.category || ""}>
                All Categories
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
            <p className="product-label"> Upload Image</p>
            <input
              type="file"
              accept="image/*"
              className="product-input"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview && (
              <img
              
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
                src={selectedProduct.image || ""}
              />
            )}

            <p className="product-label"> Quantity</p>
            <input
              type="number"
              className="product-input"
              value={selectedProduct.quantity || ""}
              onChange={(e) =>
                setselectedProduct({
                  ...selectedProduct,
                  quantity: e.target.value,
                })
              }
            />
          </div>
          <button className="vendor-add-btn" onClick={handleUpdateSubmit}>
            {" "}
            Update Product
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorDisplayProduct;