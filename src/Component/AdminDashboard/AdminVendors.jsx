import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminVendors = () => {
  const [data, setData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fetchVendors = () => {
    const apiUrl = "https://fresh-basket.onrender.com/vendors/getAllVendors";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://fresh-basket.onrender.com/vendors/deleteVendorById/${id}`)
      .then((response) => {
        fetchVendors(); // Refresh the vendor list after deletion
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdate = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  const handleUpdateSubmit = () => {
    if (selectedVendor) {
      // Perform the update operation using selectedVendor data
      axios
        .put(
          `https://fresh-basket.onrender.com/vendors/updateVendorById/${selectedVendor._id}`,
          selectedVendor
        )
        .then((response) => {
          fetchVendors(); // Refresh the vendor list after update
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="AdminVendors">
      <div className="Admin-table,">
        <p className="order-title"> Vendors</p>
        <table className="tableDes, vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last-Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Company</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.name}</td>
                <td>{vendor.lastName}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone}</td>
                <td>{vendor.company}</td>
                <td>{vendor.password}</td>
                <td>
                  <div className="button-containor">
                    <button
                      type="button"
                      className="submitbt1"
                      onClick={() => handleUpdate(vendor)} // Pass the vendor object to handleUpdate
                    >
                      Update Info
                    </button>

                    <button
                      type="button"
                      className="btn-delete1"
                      onClick={() => handleDelete(vendor._id)}
                    >
                      Delete Info
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedVendor && (
        <div className="updateModal" id="updateModal">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <div className="product-input-container">
            <p className="product-label">Name</p>
            <input
              type="text"
              className="product-input"
              value={selectedVendor.name || ""} // Use selectedVendor instead of vendor
              onChange={(e) =>
                setSelectedVendor({ ...selectedVendor, name: e.target.value })
              }
            />
            <p className="product-label"> last name</p>

            <input
              type="text"
              className="product-input"
              value={selectedVendor.lastName || ""}
              onChange={(e) =>
                setSelectedVendor({
                  ...selectedVendor,
                  lastName: e.target.value,
                })
              }
            />
            <p className="product-label"> Email</p>
            <input
              type="email"
              className="product-input"
              value={selectedVendor.email || ""}
              onChange={(e) =>
                setSelectedVendor({ ...selectedVendor, email: e.target.value })
              }
            />
            <p className="product-label"> Phone Number</p>
            <input
              type="number"
              className="product-input"
              value={selectedVendor.phone || ""}
              onChange={(e) =>
                setSelectedVendor({ ...selectedVendor, phone: e.target.value })
              }
            />
            <p className="product-label"> Copmany</p>
            <input
              type="text"
              className="product-input"
              value={selectedVendor.company || ""}
              onChange={(e) =>
                setSelectedVendor({
                  ...selectedVendor,
                  company: e.target.value,
                })
              }
            />

            <p className="product-label"> Password</p>
            <input
              type="text"
              className="product-input"
              value={selectedVendor.password || ""}
              onChange={(e) =>
                setSelectedVendor({
                  ...selectedVendor,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="button-containor">
          <button className="submitbt2" onClick={handleUpdateSubmit}>
            {" "}
            Update Vendor
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendors;
