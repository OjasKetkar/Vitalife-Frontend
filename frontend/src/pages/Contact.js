import { useState } from 'react';
import '../styles/contact.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Contact() {

    const [contact,setContact] = useState({
        name: "",
        email: "",
        message : ""
    })
    

    const handleInputs = (e) =>{
        const { name, value } = e.target;
        setContact((prevContact) => ({ ...prevContact, [name]: value }));
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { name, email, message } = contact;
  
      const res = await fetch('https://vitalife-api.onrender.com/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      const data = await res.json();
      console.log(data);
  
      if (res.status === 400 || res.status === 500 || (data && data.error)) {
        console.log('Contact entry failed');
        toast.error('Error!');
      } else if (res.status === 200 || res.status === 204) {
        console.log('Contact entry successful');
        toast.success('Message Sent!');
      }
      
    };

    return (
        <div className="contact">
            
                <h1 className='contact-header'>Contact Us</h1>

        <div className="contact-container">

            <div className="contact-left">
                <h3 className='contactleft-content'>Get In Touch With Us For The Best Quality Products</h3>
                <h1 className='contactleft-content  '>Or Tell Us More About Your Product</h1>
            </div>
            <div className="contact-right">
                <h1 className='contactForm-header'>Message Us</h1>
                <div className="contact-form">
                    <input 
                    name='name'
                    type="text" placeholder='Name' className="contact-input" onChange={handleInputs}
                    value={contact.name}
                    />
                    <input type="text" placeholder='Email' 
                    name="email" className="contact-input" value={contact.email}
                    onChange={handleInputs}/>
                    <textarea name="message"  type="text" id="message" cols="30" rows="8" placeholder='Message' className="contact-input"
                    onChange={handleInputs} value={contact.message}></textarea>
                    <button className='contactBtn' onClick={handleSubmit}>Submit</button
                    >
                </div>
            </div>
        </div>
        {/* <ToastContainer position="bottom-right" /> */}
    </div>
    )
    }