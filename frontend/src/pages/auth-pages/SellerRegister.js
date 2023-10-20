import React, { useState } from "react";
import '../../styles/sellerregister.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SellerRegister() {

    const [seller,setSeller] = useState({
        name : '',
        email : '',
        phone : '',
        password : '',
        cpassword : ''
    })

    const handleInputs = (e) => {
        const {name,value} = e.target;
        setSeller((prevSeller) => ({...prevSeller, [name] : value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name, email, phone, password, cpassword } = seller;
    
        const res = await fetch('https://vitalife-api.onrender.com/sell/register', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, phone, password, cpassword }),
        });
    
        const data = await res.json();
        console.log(data);
    
        if (res.status !== 201 || !data) {
          toast.error("Registeration failed")
          console.log('Seller registeration failed');
          console.log(res.status)
        } else if ( res.status === 201 || data) {
          toast.success("Registeration successful")
          console.log('Seller registeration successful');
          window.location.href = '/sell'
        }
      };

    return(
        <>
        {/* <NavBar/> */}
        <div className="sellerregister">
          <h1>Register Yourself as a Seller</h1>
            <form className="sellerregister-form">
                <input type="text" name="name" placeholder="Name" onChange={handleInputs} className="sellerregister-details"/>
                <br />
                <input type="text" name="email" placeholder="Email" onChange={handleInputs} className="sellerregister-details"/>
                <br />
                <input type="number" name="phone" placeholder="Phone" onChange={handleInputs} className="sellerregister-details"/>
                <br />
                <input type="text" name="password" placeholder="Password" onChange={handleInputs} className="sellerregister-details"/>
                <br />
                <input type="text" name="cpassword" placeholder="Confirm Password" onChange={handleInputs} className="sellerregister-details"/>

                <button type="submit" onClick={handleSubmit} className="sellerregisterBtn">Submit</button>
            </form>
            </div>
      <ToastContainer position="bottom-right" />
        </>
    )
}