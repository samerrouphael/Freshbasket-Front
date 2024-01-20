import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminClient = () => {
  const [data, setData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fetchClients = () => {
    const apiUrl = "http://localhost:8000/client/getAllClients";
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
    fetchClients();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/client/deleteClientById/${id}`)
      .then((response) => {
       
        fetchClients(); // Refresh the cient list after deletion
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdate = (cient) => {
    setSelectedClient(cient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  const handleUpdateSubmit = () => {
    if (selectedClient) {
      // Perform the update operation using selectedClient data
      axios
        .put(
          `http://localhost:8000/client/updateClientById/${selectedClient._id}`,
          selectedClient
        )
        .then((response) => {
         
          fetchClients(); // Refresh the cient list after update
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="AdminClient">
      <div className="Admin-table">
        <p className="order-title"> Cients</p>
        <table class="tableDes">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last-Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cient) => (
              <tr key={cient._id}>
                <td>{cient.firstName}</td>
                <td>{cient.lastName}</td>
                <td>{cient.email}</td>
                <td>{cient.phone}</td>
              
                <td>{cient.password}</td>
                <td>
                  <div className="button-container">
                    <button
                      type="button"
                      className="submitbt"
                      onClick={() => handleUpdate(cient)} // Pass the cient object to handleUpdate
                    >
                      Update Info
                    </button>

                    <button
                      type="button"
                      className="btn-delete1"
                      onClick={() => handleDelete(cient._id)}
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
      {showModal && selectedClient && (
        <div className="updateModal" id="updateModal">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <div className="product-input-container">
            <p className="product-label">Name</p>
            <input
              type="text"
              className="product-input"
              value={selectedClient.firstName || ""} // Use selectedClient instead of cient
              onChange={(e) =>
                setSelectedClient({ ...selectedClient, firstName: e.target.value })
              }
            />
            <p className="product-label"> last name</p>

            <input
              type="text"
              className="product-input"
              value={selectedClient.lastName || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  lastName: e.target.value,
                })
              }
            />
            <p className="product-label"> Email</p>
            <input
              type="email"
              className="product-input"
              value={selectedClient.email || ""}
              onChange={(e) =>
                setSelectedClient({ ...selectedClient, email: e.target.value })
              }
            />
            <p className="product-label"> Phone Number</p>
            <input
              type="number"
              className="product-input"
              value={selectedClient.phone || ""}
              onChange={(e) =>
                setSelectedClient({ ...selectedClient, phone: e.target.value })
              }
            />
            <p className="product-label"> Password</p>
            <input
              type="text"
              className="product-input"
              value={selectedClient.password || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button className="vendor-add-btn" onClick={handleUpdateSubmit}>
            {" "}
            Update Client
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminClient;