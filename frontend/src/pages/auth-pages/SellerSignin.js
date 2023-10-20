import React, { useState } from "react";
import '../../styles/sellersignin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcryptjs'

export const authSeller = (inComingState) => {
  const isAuthenticated = /* Your authentication logic */ inComingState;
  return isAuthenticated;
}

const SellerSignin = () => {
  const [seller, setSeller] = useState({
    email: "",
    password: "",
  });
  
  const [loginError, setLoginError] = useState("");

  const [loggedInUserName, setLoggedInUserName] = useState("");

  const [signedInError, setSignedInError] = useState(false)


  const handleInputs = (e) => {
    const { name, value } = e.target;
    setSeller((prevSeller) => ({ ...prevSeller, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = seller;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // const newPassword = await bcrypt.hash(password,15);
    
    try {
        // Fetch the data from getAllUsers API
        const res = await fetch("https://vitalife-api.onrender.com/getAllSellers");
        const data = await res.json();
        const incomingData = data.data
        console.log(incomingData)
        
        // Find the user with the matching email in the data received from the API
        const matchedUser = incomingData.find((user) => user.email === email);
        
      if (matchedUser && matchedUser.password === password) {
        // Login successful
        toast.success("Login Successful")
        console.log("Seller login successful");
        setLoggedInUserName(matchedUser.name);
        
        //saving the name in local storage
        localStorage.setItem("sellerName", matchedUser.name);
        window.location.href = `/nav/sell`;
      } else {
        // Login failed due to incorrect credentials
        toast.error("Invalid credentials. Please try again")
        console.log("Seller login failed");
        // setLoginError("Invalid credentials. Please try again.");
        setSignedInError(true)

      }
    } catch (error) {
      toast.error("Something went wrong. Please try again")
      console.error("Error during seller login:", error);
      // setLoginError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="sellersignin">
      <h1>Sign in as a Seller</h1>
        <form className="sellersignin-form">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleInputs}
            value={seller.email}
            className="sellersignin-details"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputs}
            value={seller.password}
            className="sellersignin-details"
          />
          <br />
          <button type="submit" className="sellersigninBtn" onClick={handleSubmit}
          >SignIn</button>
        </form>
        {loginError && <p className="error-message">{loginError}</p>}
        <br /> 

        {signedInError ? <a href="/seller/register"><button className="sellersigninBtn-register">Register</button></a> : ""}        
        
      <ToastContainer position="bottom-right" />

      </div>
  );
};

export default SellerSignin;
