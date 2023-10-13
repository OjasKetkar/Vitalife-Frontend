import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import '../styles/sell.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sell() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    volume: '',
    image: null, // New image field
    imageName: ''
  });

  let [submitted, setSubmitted] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
      imageName: file.name, // Set the imageName to the filename of the uploaded image
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, name, price, volume, description, imageName } = product;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("volume", volume);
    formData.append("description", description);
    formData.append("imageName", imageName);
    formData.append("image", product.image); // Append the image file to the form data

    const res = await fetch('https://vitalife-api.onrender.com/sell', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json(); // Parse the response JSON
      toast.success('Product entry successful');
      console.log('Product entry successful');
      setSubmitted(true);
      
    } else {
      toast.error('Product entry failed');
      console.error('Product entry failed');
    }
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="sell">
        <h1 className='sell-headline'>
          {submitted ? 'Your Order' : `Welcome`}
        </h1>
        {submitted ?
          <div className="sell-receipt">
            <div className="receipt-details">
              Name: {product.name}
            </div>
            <div className="receipt-details">
              Price: Rs. {product.price} per {product.name}
            </div>
            <div className="receipt-details">
              Volume: {product.volume}
            </div>
            <div className="receipt-details">
              Net Value Uploaded: Rs. {product.price * product.volume}
            </div>
            <a href="/nav/sell">
              <button className='receiptBtn'>Back</button>
            </a>
          </div>
          :
          <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
            {/* <input type="number" name="id" placeholder="ProductID" value={product.id} onChange={handleInputs}
              className='sell-inputs' />
            <br /> */}
            <input type="text" name="name" placeholder="ProductName" value={product.name} onChange={handleInputs}
              className='sell-inputs' />
            <br />
            <input type="text" name="description" placeholder="ProductDesc" value={product.description} onChange={handleInputs}
              className='sell-inputs' />
            <br />
            <input type="text" name="price" placeholder="Price" value={product.price} onChange={handleInputs}
              className='sell-inputs' />
            <br />
            <input type="number" name="volume" placeholder="Quantity" value={product.volume} onChange={handleInputs} min={1}
              className='sell-inputs' />
            <br />
            <input type="file" name="image" onChange={handleImageUpload} className='sell-fileuploadBtn' />
            <br />
            <button type="submit" className='submitBtn'>Submit</button>
          </form>
        }

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
