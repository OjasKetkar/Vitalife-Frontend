import { useEffect, useState } from 'react'
import '../styles/offer.css'
import productforyou from '../utils/productsforyou.png'
import { Link } from 'react-router-dom';
import { Cloudinary } from "cloudinary-core"; // Import Cloudinary
export default function Offer() {

    const [offer,setOffer] = useState([]);

    const callOfferPage = async () => {
        try{
            const res = await fetch("https://vitalife-api.onrender.com/getAllproducts/", {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                },
            });

            const data = await res.json();
            setOffer(data.data);
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        callOfferPage();
    },[]);

    return(
        <div className="offer">

            <div className="shopnow">
                <img src={productforyou} alt="" className='shopnow-image'/>
                <div className="shopnow-right">
                    <p className='shopnow-tagline'>New Collections</p>
                    <h1 className="shopnow-header">Products Meant Just for You</h1>
                    <p className='shopnow-para'>Explore our latest collections of handpicked Ayurvedic products meticulously crafted to cater to your unique wellness needs. From skincare to holistic remedies, each item is thoughtfully curated to bring you the best of nature's healing power. Embrace the journey to a healthier, more balanced you with our exclusive range.</p>
                    <Link to="/nav/catalogue"><button className='shopnowBtn'>Shop Now</button></Link>
                </div>
            </div>

            <div className="offer-topline">

                <p className='offer-main'>
                    A combination of best and healthiest
                </p>
                <h1 className='offer-headline'>
                    What We Offer
                </h1>

            </div>

               {/* design this part as boxes  */}
               <div className="latest-products">
  {offer.slice(0, 4).map((offered, key) => {
    // Initialize Cloudinary
  const cloudinaryCore = new Cloudinary({ cloud_name: 'dfot3xc1n' });
    return (
      <div className="offer-card-container" key={key}>
        <div className="card-image">
          <img
            src = {cloudinaryCore.url(offered.image.public_id, {
                width: 300,
                height: 300,
                crop: 'fill',
              })}
            alt=""
            className="offercard-image"
          />
        </div>
        <div className="offercard-details">
          <div className="offercard-name">{offered.name}</div>
          <div className="offercard-description">{offered.description}</div>
        </div>
      </div>
    );
  })}
</div>

        </div>
    )
}