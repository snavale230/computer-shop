import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./Login.sass";
import { toast } from 'react-toastify';
import { loginAPI } from "../../Components/ActionCreator/ActionCreator";
import shree from '../../Img/—Pngtree—shree hindi calligraphy with dry_6482721.png'

const Login = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true); // State to disable button initially

  // Update buttonDisabled state based on form validity
  useEffect(() => {
    setButtonDisabled(!(userName && password)); // Disable button if username or password is empty
  }, [userName, password]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value.charAt(0).toUpperCase() + e.target.value.substring(1));
  };

  const handlePassword = (e) => {
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
        // navigate("/home");
      } else {
        // API error: Set the error message
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Your Session has expired. You will be redirected to Login Page.");
        navigate("/");
      } else if (error.response && error.response.status === 429) {
        toast.error("Too Many Requests: You have exceeded the rate limit. Please try again later.");
      } else {
        toast.error("There appears to be a technical issue connecting to our servers. Could you please try again later.")
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
        <div className="login_page shadow" style={gradientStyle} >
          <img src={shree} alt="Image not found"  style={{width:'400px',height:'270px'}}/>
          <h5 style={{color:'white'}}>Login to Shree Computers</h5>
          {/* <div className="profile_pic_container">
            <label
              htmlFor="profilePic"
              className="d-flex align-items-start upload_pic_label"
              style={{ borderBottom: "1px solid #20B2AA" }}
            >
              Upload Profile pic{" "}
              <DriveFolderUploadOutlinedIcon className="icon mx-1" />
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
            {profilePic && <img src={profilePic} alt="Avatar" />}
          </div> */}
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
          <div className="password_container">
            <label htmlFor="password">Password</label>
            <input
            className="form-control"
              type="text" // Changed to password type
              id="password"
              value={password}
              onChange={handlePassword}
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
