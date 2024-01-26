import "../Style/Signup.css";
import signup from "../images/signup.jpg";
import back from "../images/back.svg";
import user from "../images/user.svg";
import lastname from "../images/lastname.svg";
import password from "../images/password.svg";
import email from "../images/email.svg";
import phone from "../images/phone.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSignup = async () => {
    if (!emailValue) {
      console.error("Email cannot be empty");
      return;
    }

    const projectBody = {
      firstName,
      lastName,
      email: emailValue,
      phone: phoneValue,
      password: passwordValue,
    };

    try {
      const response = await axios.post(
        "https://fresh-basket.onrender.com/client/addClient",
        projectBody
      );

      localStorage.removeItem("email");
      localStorage.setItem("email", emailValue);
      setShowModal(true);
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="signup">
      <div className="signup-div">
        <div className="back">
          <Link to="/">
            <img src={back} className="back-img" />
          </Link>
        </div>
        <div className="signup-div1">
          <img src={signup} className="signup-image" />
          <p>
            {" "}
            We always make our customer
            <br />
            happy by providing as many choises as possible.
          </p>
        </div>
      </div>
      <div className="signup-div2">
        <div className="part">
          <p className="signup-title">Sign Up</p>
          <div className="user1">
            <img src={user} className="login-img" />

            <div className=" text">
              <input
                type="text"
                id="username"
                placeholder="First Name"
                className="login-input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="user1">
            <img src={lastname} className="login-img" />

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
            <img src={phone} className="login-img" />

            <div className=" text">
              <input
                type="text"
                id="username"
                placeholder="Phone"
                className="login-input"
                onChange={(e) => setPhoneValue(e.target.value)}
              />
            </div>
          </div>
          <div className="user1">
            <img src={email} className="login-img" />

            <div className=" text">
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
          </div>

          <div className="user1">
            <img src={password} className="login-img" />

            <div className=" text">
              <input
                type="text"
                id="username"
                placeholder="Password"
                className="login-input"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-signup">
            <button type="button" className="submitbt" onClick={handleSignup}>
              Create Account
            </button>
            <p>
              {" "}
              Already have an account? <Link to="/Login">Sign in </Link>
            </p>
          </div>
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
                <button className="Oksignup">Continue To Website</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
