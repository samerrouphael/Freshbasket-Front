import React, { useState, useEffect } from "react";
const AdminAddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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

  const handleAddProject = async () => {
    const vendorName = localStorage.getItem("vendorName"); // Retrieving vendorName from localStorage
    const projectBody = {
      name,
      description,
      price,
      category,
      quantity,
      vendorName,
      image,
      category,
      quantity,
    };

    console.log(projectBody)

    try {
      const response = await fetch(
        "https://fresh-basket.onrender.com/products/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.alert("Product added successfully!");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Error adding product. Please try again later.");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setImage(base64String); // Assuming you want to set the Base64 string to the 'image' state
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="dashb-container">
      <p className="add-title">Add Your Product</p>
      <div className="product-input-container">
        <p className="product-label"> Product Name</p>
        <input
          type="text"
          className="product-input"
          onChange={(e) => setName(e.target.value)}
        />

        <p className="product-label"> Description</p>
        <textarea
          className="product-input"
          onChange={(e) => setDescription(e.target.value)}
        />

        <p className="product-label"> Price</p>
        <input
          type="number"
          className="product-input"
          onChange={(e) => setPrice(e.target.value)}
        />

        <p className="product-label"> Category</p>
        <select
          className="selectCategory"
          id="selectCategory"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
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
          onChange={handleImageUpload}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        )}
        <p className="product-label"> Quantity</p>
        <input
          type="number"
          value={quantity}
          className="product-input"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className="vendor-add-btn" onClick={handleAddProject}>
        {" "}
        Add Product
      </button>
    </div>
  );
};

export default AdminAddProducts;
