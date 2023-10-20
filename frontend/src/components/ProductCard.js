import React, { useState } from "react";
import "../styles/productcard.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cloudinary } from "cloudinary-core";
import infoCircle from '../utils/info-circle.svg'

export const authBuyer = (inComingState) => {
  const isAuthenticated = inComingState;
  return isAuthenticated;
}

const LoginPopup = ({ onClose, onLoginSuccess }) => {

  const [buyer, setBuyer] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);
  const [loggedInBuyerName, setLoggedInBuyerName] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBuyer((prevBuyer) => ({ ...prevBuyer, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = buyer;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
        const res = await fetch("https://vitalife-api.onrender.com/getAllBuyers");
        const data = await res.json();
        const incomingData = data.data
        console.log(incomingData)

        const matchedUser = incomingData.find((user) => user.email === email);

        if (matchedUser && matchedUser.password === password) {
          toast.success("Buyer login successful")
          console.log("Buyer login successful");
          setLoggedInBuyerName(matchedUser.name); 
          authBuyer(true);
          onLoginSuccess();
        } else {
          toast.error("Buyer login failed")
          console.log("Buyer login failed");
          setLoginError(true);
        }
    } catch (error) {
      toast.error("Something went wrong. Please try again later")
      console.error("Error during buyer login:", error);
    }
  };

  return (
    <div className="login-popup">
      <h2 className="loginpopup-header">Please login to proceed with the purchase.</h2>
      <form action="" className="popup-form">
        <input type="text" name="email" placeholder="Email" onChange={handleInputs} className="loginpopup-details"/>

        <input type="password" name="password" placeholder="Password" onChange={handleInputs} className="loginpopup-details"/>

        <button type="submit" onClick={handleSubmit} className="loginpopupBtn">Login</button>
        {loginError ? <div className="showloginerror"><p>Invalid Credentials. Check email or password</p> <Link to='/catalogue/register'>

          <button type="submit" className="loginpopupBtn-register">Register</button></Link> </div> : <p></p>}

        <button onClick={onClose} className="loginpopupBtn-close">Close</button>
      </form>
    </div>
  );
};

const BillPopup = ({ productName, quantity, price, onClose }) => {
  return (
    <div className="bill-popup">
      <h1 className="billpopup-details">Total Bill generated: </h1>
      <h3 className="billpopup-detail">Product Name: {productName}</h3>
      <h3 className="billpopup-detail">Quantity: {quantity}</h3>
      <h3 className="billpopup-detail">Total Amount: Rs.{quantity * price}</h3>
      <button onClick={onClose} className="billpopupBtn">Close</button>
    </div>
  );
}

const ProductCard = ({ product }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleInputs(e) {
    const { value } = e.target;
    setSelectedQuantity(value);
  }

  function handleLoginSuccess() {
    setShowLoginPopup(false);
    setLoggedIn(true);
  }

  function handleBuyButtonClick() {
    setShowLoginPopup(true);
  }

  function handleCloseLoginPopup() {
    setShowLoginPopup(false);
  }

  function handleCloseBillPopup() {
    setShowBillPopup(true);

    const updateStock = async () => {
      try {
        const response = await fetch(`https://vitalife-api.onrender.com/updateStock/${product._id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: selectedQuantity }),
        });

        const data = await response.json();
        console.log(data.message);

        if (data.updateStock === 0) {
          deleteProduct();
        }
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    };

    const deleteProduct = async () => {
      try {
        const deleteResponse = await fetch(`https://vitalife-api.onrender.com/deleteProduct/${product._id}`, {
          method: 'DELETE',
          mode: 'cors',
        })

        const deleteData = await deleteResponse.json();
        console.log(deleteData.message);
      } catch (error) {
        console.error("Error deleting the data", error)
      }
    }

    updateStock();
  }

  const cloudinaryCore = new Cloudinary({ cloud_name: 'dfot3xc1n' });

  return (
    <div className="p-card">
      <div key={product._id[0]} className="productcard">
        <img
          src={cloudinaryCore.url(product.image.public_id, {
            width: 300,
            height: 300,
            crop: 'fill',
          })}
          alt=""
          className="productcard-image"
        />
        <div>
          <h2 className="productdetails productheader">{product.name}</h2>
          <h4 className="productdetails">In Stock: {product.volume}</h4>
          <h4 className="productdetails">Price/-unit : {product.price}</h4>
        </div>
        <br />
        <input
          type="number"
          name="quantity"
          onChange={handleInputs}
          max={product.volume}
          min={0}
          value={selectedQuantity}
          className="stockamount"
        />

        <br />

        <div className="productCard-bottom">

          {/* <a href="#" className="infoCircle" >
            <img src={infoCircle} alt="infocircle" className="infoCircle" />
          </a> */}
{/* 
          <div className="infoCircle">

          <Link to={`/productInfo/${product._id}`}>
  <img src={infoCircle} alt="" className="infoCircle-img"/>
</Link>
</div> */}


          <button
            type="submit"
            onClick={handleBuyButtonClick}
            className="productBtn"
          >
            Buy
          </button>
      </div>
      {showLoginPopup && !loggedIn && (
        <LoginPopup
          onClose={handleCloseLoginPopup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {!showBillPopup && loggedIn && (
        <BillPopup
          productName={product.name}
          quantity={selectedQuantity}
          price={product.price}
          onClose={handleCloseBillPopup}
        />
      )}
    </div>
    </div>
  );
};

export default ProductCard;
