import React, { useState } from "react";

import "../../Style/Dashboard.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/admin/getAdminByEmailAndPassword/${email}/${password}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data && data.length > 0) {
          sessionStorage.setItem("adminEmail", email);
          sessionStorage.setItem("isAdmin", "true");
          window.location.href = "/adminDash";
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
        <p className="logintitle">Admin Login</p>
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

export default AdminLogin;
