import "../Style/Login.css";
import login from "../images/login.jpg";
import password from "../images/password.svg";
import email from "../images/email.svg";
import back from "../images/back.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClientLogin = async () => {
    try {
      const response = await axios.post(
        "https://fresh-basket.onrender.com/client/clientLogin",
        {
          email: emailValue,
          password: passwordValue,
        }
      );

      if (response.data && response.data.success) {
        localStorage.removeItem("email");
        localStorage.setItem("email", emailValue);
        setShowModal(true);
      } else {
        alert("Email or Password entered is not valid");
      }
    } catch (error) {
      alert("Email or Password entered is not valid");
      console.error("Login failed:", error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="login">
      <div className="login-div">
        <div className="back">
          <Link to="/">
            <img src={back} className="back-img" />
          </Link>
        </div>
        <div className="login-div1">
          <img src={login} className="login-image" />
          <p>
            {" "}
            We always make our customer
            <br /> happy by providing as many choises
            <br /> as possible.
          </p>
        </div>
      </div>
      <div className="login-div2">
        <div className="part1">
          <div className="part2">
            <p className="login-title">USER LOGIN</p>
            <div className="user1">
              <img src={email} className="login-img1" />

              <input
                type="text"
                placeholder="Email"
                className="login-input"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
          </div>
          <div className="user1">
            <img src={password} className="login-img" />

            <div className="text">
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
          </div>

          <button type="button" className="loginbt" onClick={handleClientLogin}>
            Log In
          </button>
          <p className="loginp">
            {" "}
            Not on Fresh Basket ?<Link to="/Signup"> Sign Up </Link>
          </p>
        </div>
      </div>
      {showModal && (
        <div>
          {/* Overlay */}
          <div className="overlay show" onClick={closeModal}></div>

          {/* Modal */}
          <div className="confirmation-modal show">
            <div className="cond">You Signed Up Successfully</div>
            <div className="Okbutton">
              <Link to="/">
                <button className="Okcontinue">Continue To Website</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
