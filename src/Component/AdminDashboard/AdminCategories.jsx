import React, { useState, useEffect } from "react";
import "../../Style/AdminInfo.css";
import back from "../../images/back.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/category/getAllCategories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/category/addCategory",
        { category: newCategory }
      );
      console.log("Category added:", response.data);
      fetchCategories();
      setNewCategory(""); // Reset input field after adding category
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const updateCategory = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/category/updateCategoryById/${id}`,
        {
          /* Updated category data */
        }
      );
      console.log("Category updated:", response.data);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/category/deleteCategoriesById/${id}`
      );
      console.log("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="back">
        <Link to="/">
          <img src={back} className="back-img" alt="Back" />
        </Link>
      </div>
      <div className="product">
        <p className="order-title">Categories</p>
        <div className="enter-product">
          <input
            type="text"
            className="vendorlogin-input"
            placeholder="Add Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="userLogin-btn" onClick={addCategory}>
            Add Category
          </button>
        </div>
        <div className="table1">
          <table className="tableDes">
            <thead>
              <tr>
                <th>Category</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.category}</td>
                  <td>
                    <button
                      type="button"
                      className="submitbt"
                      onClick={() => updateCategory(category._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="productbtn-delete"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
