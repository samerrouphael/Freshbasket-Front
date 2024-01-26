import React, { useState } from "react";
import "../../Style/Dashboard.css";
import axios from "axios";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://fresh-basket.onrender.com/vendors/vendorLogin",
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        const data = response.data;

        if (data && data.message === "Vendor logged in successfully") {
          localStorage.removeItem("vendorEmail");
          localStorage.setItem("vendorEmail", email);
          window.location.href = "/vendorDash";
        } else {
          alert("Incorrect email or password");
        }
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="vendorLogin">
      <div className="vendorLoginContainer">
        <p className="logintitle">Vendor Login</p>
        <input
          type="text"
          className="vendorlogin-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="vendorlogin-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="userLogin-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default VendorLogin;
