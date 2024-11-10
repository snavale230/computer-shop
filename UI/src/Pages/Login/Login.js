import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.sass";
import { toast } from 'react-toastify';
import { loginAPI } from "../../Components/ActionCreator/ActionCreator";
import shree from '../../Img/—Pngtree—shree hindi calligraphy with dry_6482721.png';

const Login = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(userName && password));
  }, [userName, password]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value.charAt(0).toUpperCase() + e.target.value.substring(1));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    navigate("/home");
    e.preventDefault();
    localStorage.removeItem("timerStartTime");

    const requestBody = {
      mobile: userName,
      password: password
    };

    try {
      const response = await loginAPI(requestBody);
      if (response.status === 200 && response.data.businessStatusCode === 2) {
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Your Session has expired. You will be redirected to Login Page.");
        navigate("/");
      } else if (error.response && error.response.status === 429) {
        toast.error("Too Many Requests: You have exceeded the rate limit. Please try again later.");
      } else {
        toast.error("There appears to be a technical issue connecting to our servers. Could you please try again later.");
      }
      console.error("Error fetching loan data:", error);
    }
  };

  const gradientStyle = {
    height: '100vh',
    background: 'linear-gradient(to right, #b0bec5, #546e7a)'
  };

  return (
    <>
      <motion.div
        className="login_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="login_page shadow" style={gradientStyle}>
          <img src={shree} alt="Image not found" style={{ width: '400px', height: '270px' }} />
          <h5 style={{ color: 'white' }}>Login to Shree Computers</h5>
          <div className="username_container ">
            <label htmlFor="username">Mobile No.</label>
            <input
              className="form-control"
              type="text"
              maxLength={10}
              id="username"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>
          <div className="username_container">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              maxLength={10}
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button onClick={handleLogin} style={{ fontWeight: 600 }} disabled={buttonDisabled}>
            Login
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
