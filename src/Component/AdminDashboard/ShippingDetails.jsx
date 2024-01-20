import "../../Style/AdminInfo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import back from "../../images/back.svg";
import { Link } from "react-router-dom";

const ShippingDetails = () => {
  const [data, setData] = useState([]);
  const fetchShippingDetails = () => {
    const apiUrl = "http://localhost:8000/shipping/getAllShippingOrders";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/shipping/deleteShippingById/${id}`)
      .then((response) => {
        fetchShippingDetails(); // Refresh the cient list after deletion
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchShippingDetails();
  }, []);

  const handleUpdateOrder = (id) => {
    axios
      .put(`http://localhost:8000/shipping/cancelShipping`, { shippingId: id })
      .then((response) => {
        fetchShippingDetails(); // Refresh the client list after updating order
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="AdminVendors">
      <div className="back">
        <Link to="/">
          <img src={back} className="back-img" />
        </Link>
      </div>
      <div className="Admin-table">
        <p className="order-title"> Client Shipping Details</p>

        <table className="tableDes">
          <tr>
            <td>Name</td>
            <td>Last-Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Country</td>
            <td>City Name</td>
            <td>Postal Code</td>
            <td>Street Adress</td>
            <td>Total Price</td>
            <td>Date</td>
            
            <td>Actions</td>
          </tr>
          {data.map((shipping) => (
            <tr key={shipping._id}>
              <td>{shipping.firstName} </td>
              <td>{shipping.lastName}</td>
              <td>{shipping.email} </td>
              <td>{shipping.phoneNUmber} </td>
              <td>{shipping.country} </td>
              <td>{shipping.cityName} </td>
              <td>{shipping.postalCode} </td>
              <td>{shipping.streetAddress} </td>
              <td>{shipping.totalPrice} </td>
              <td>{shipping.date} </td>
             

              <td>
                <div className="button-containor">
                
                  <button
                    type="button"
                    className="productbtn-delete"
                    onClick={() => handleDelete(shipping._id)}
                  >
                    Delete Order
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ShippingDetails;
