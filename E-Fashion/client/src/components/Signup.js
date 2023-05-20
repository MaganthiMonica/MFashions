import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

// import {useNavigate} from 'react-router-dom'

const SignUp = () => {
const [data, setData] = useState({
  name:"",
  email:"",
  password:"",
  phone:"",
  confirmPassword:""
})
// console.log(data)
const [error, setError] = useState("")
const navigate = useNavigate()


  const handleSubmit = async(event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // form submission logic here
    const response = await fetch("http://localhost:5000/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone
    })
  });
  const resData = await response.json()
  // console.log(resData)
  // console.log(response.data);
      toast.success("Signup successful")
      navigate("/")

}

const handleInputChange = (event) =>{
  setData({...data, [event.target.name]:event.target.value})

}

const handlePasswordChange = (event) => {
  const password = event.target.value;
  setData((prevState) => ({ ...prevState, password }));
  if (data.confirmPassword !== password) {
    setError("Passwords do not match");
  } else {
    setError("");
  }
};

const handleConfirmPasswordChange = (event) => {
  const confirmPassword = event.target.value;
  setData((prevState) => ({ ...prevState, confirmPassword }));
  if (data.password !== confirmPassword) {
    setError("Passwords do not match");
  } else {
    setError("");
   
  }
};

  return (
    <div className="container">
    <form onSubmit={handleSubmit} className="signup-form">
    <Link to="/" className="navbar-logo">
            <img src={require('../assets/logo-png.png')} alt="" className="logo" />
            <span className="logo-name">M Fashion</span>
          </Link>
      <h2>SignUp</h2>
      <label className="signup-label">
        Name:
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Email:
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Phone Number:
        <input
          type="tel"
          name="phone"
          onChange={handleInputChange}
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Password:
        <input
          type="password"
          onChange={handlePasswordChange}
          className="signup-input"
        />
      </label>
      <label className="signup-label">
        Confirm Password:
        <input
          type="password"
          onChange={handleConfirmPasswordChange}
          className="signup-input"
        />
           {error && <div className="signup-error-message">{error}</div>}
      </label>

      <button type="submit" className="signup-button">
        Sign Up
      </button>
      <div className="formLink">
        <Link to='/login'>
      /<p> Login</p> 
        </Link>
      </div>
    </form>
    </div>
  );
};

export default SignUp;