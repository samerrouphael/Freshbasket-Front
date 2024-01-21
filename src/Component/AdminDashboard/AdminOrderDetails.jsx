import "../../Style/AdminInfo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import back from "../../images/back.svg";
import { Link } from "react-router-dom";

const AdminOrderDetails = () => {
  const [data, setData] = useState([]);
  const fetchOrderDetails = () => {
    const apiUrl = "http://localhost:8000/orderDetail/getAllOrders";
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
    fetchOrderDetails();
  }, []);
  
  const handleUpdateOrder = (id) => {
    console.log("Updating order with ID:", id); // Add this line to log the ID
    axios
      .put(`http://localhost:8000/orderDetail/cancelOrder/${id}`)
      .then((response) => {
        fetchOrderDetails(); // Refresh the client list after updating order
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
        <p className="order-title"> Order Details</p>

        <table className="tableDes">
          <tr>
            <td>Email</td>
            <td>Product ID</td>
            <td>Date</td>
            <td>Total Price</td>
            <td>Name</td>
            
            <td>Actions</td>
          
            
          </tr>
          {data.map((order) => (
            <tr key={order._id}>
              <td>{order.email} </td>
              <td>{order.productsId} </td>
              <td>{order.date} </td>
              <td>{order.totalPrice} </td>
             
              <td>{order.status} </td>   
              <td>
                <div className="button-containor">
                <button
                      type="button"
                      className="productbtn-delete"
                      onClick={() => handleUpdateOrder(order._id)}
                    >
                      Cancel Order
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

export default AdminOrderDetails;
