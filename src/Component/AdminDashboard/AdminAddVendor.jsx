import "../../Style/AdminInfo.css";

import user from "../../images/user.svg";
import emailsvg from "../../images/email.svg";
import phonesvg from "../../images/phone.svg";
import lastnamesvg from "../../images/lastname.svg";
import companysvg from "../../images/company.svg";
import back from "../../images/back.svg";
import pass from "../../images/password.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminInfo = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("test");
  const addVendor = async () => {
    const vendorName = localStorage.getItem("vendorName");
    const projectBody = {
      name,
      lastName,
      email,
      phone,
      company,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8000/vendor/addVendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.alert("Vendor added successfully!");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Error adding vendor. Please try again later.");
    }
  };
  return (
    <div className="admin-info">
      <div className="back">
        <Link to="/">
          <img src={back} className="back-img" />
        </Link>
      </div>
      <div className="admin-info1">
        <p className="admintitle"> Add Vendor </p>
        <div className="admin-user">
          <img src={user} className="login-img" />

          <div className=" text">
            <input
              type="text"
              id="username"
              placeholder="First Name"
              className="login-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="user1">
          <img src={lastnamesvg} className="login-img" />

          <div className=" text">
            <input
              type="text"
              id="username"
              placeholder="Last Name"
              className="login-input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="user1">
          <img src={phonesvg} className="login-img" />

          <div className=" text">
            <input
              type="text"
              id="username"
              placeholder="Phone"
              className="login-input"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="user1">
          <img src={emailsvg} className="login-img" />

          <div className=" text">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="user1">
          <img src={companysvg} className="login-img" />

          <div className=" text">
            <input
              type="text"
              id="username"
              placeholder="Company-name"
              className="login-input"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="button-containor">
        <button type="button" className="submitbt" onClick={addVendor}>
          Add Vendor
        </button>
      </div>
    </div>
  );
};
export default AdminInfo;
