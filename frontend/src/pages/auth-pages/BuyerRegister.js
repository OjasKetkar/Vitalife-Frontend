import React, { useState } from "react";
import NavBar from '../../components/Navbar'
import '../../styles/buyerregister.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function BuyerRegister() {

    const [buyer,setBuyer] = useState({
        name : '',
        email : '',
        phone : '',
        password : '',
        cpassword : ''
    })

    const handleInputs = (e) => {
        const {name,value} = e.target;
        setBuyer((prevBuyer) => ({...prevBuyer, [name] : value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name, email, phone, password, cpassword } = buyer;
    
        const res = await fetch('/catalogue/register', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, phone, password, cpassword }),
        });
    
        const data = await res.json();
        console.log(data);
    
        if (res.status === 422 || res.status === 500 || !data) {
          toast.error("Buyer registeration failed")
          console.log('Buyer registeration failed');
          console.log(res.status)
        } else if ( res.status === 201 || data) {
          toast.success('Buyer registeration successful')
          console.log('Buyer registeration successful');
          window.location.href = '/catalogue'
        }
      };

    return(
        <>
        {/* <NavBar/> */}
        <div className="buyerregister">
            {/* <div className="buyerregister-form"> */}
            <h1>Register as a Buyer</h1>
            <form className="buyerregister-form">
                <input type="text" name="name" placeholder="Name" onChange={handleInputs} className = "buerregisterform-details"/>
                <br />
                <input type="text" name="email" placeholder="Email" onChange={handleInputs} className = "buerregisterform-details"/>
                <br />
                <input type="number" name="phone" placeholder="Phone" onChange={handleInputs} className = "buerregisterform-details"/>
                <br />
                <input type="text" name="password" placeholder="Password" onChange={handleInputs} className = "buerregisterform-details"/>
                <br />
                <input type="text" name="cpassword" placeholder="Confirm Password" onChange={handleInputs} className = "buerregisterform-details"/>
                <button type="submit" onClick={handleSubmit} className="buerregisterformBtn">Submit</button>

            </form>
            </div>
        {/* </div> */}
      <ToastContainer position="bottom-right" />
        </>
    )
}