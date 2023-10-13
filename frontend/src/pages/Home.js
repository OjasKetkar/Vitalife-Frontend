import React from 'react';
import '../styles/home.css';
import boxsvg from '../utils/box.svg'
import collectionsvg from '../utils/collection.svg'
import refundsvg from '../utils/moneyback.svg'

export default function Home({ offersectionRef }) {
    const scrollToSection = (sectionTo) => {
        if (sectionTo.current) {
            sectionTo.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home">
            <div className="parallax-container">

            <div className="home-top">
                <div className="top-container">
                    <p className='home-header'>VitaLife</p>
                    <p className='home-tagline'>Rediscover Vitality and Wellness with VitaLife – Your Holistic Health Companion</p>
                    <button className='homeBtn' onClick={() => scrollToSection(offersectionRef)}>Shop More</button>
                </div>
            </div>
            </div>

            <div className="home-bottom">
                <div className="home-boxes">
                    <img src={collectionsvg} alt="" className='home-svgs'/>
                    <div className="box1">
                        <h3>Product Collection</h3>
                        <p>Wide Range of Choices</p>
                    </div>
                </div>
                <div className="home-boxes">
                    <img src={boxsvg} alt="" className='home-svgs'/>
                    <div className="box2">
                        <h3>Free Shipping</h3>
                        <p>Free Shipping on Order</p>
                    </div>
                </div>
                <div className="home-boxes">
                    <img src={refundsvg} alt="" className='home-svgs'/>
                    <div className="box3">
                        <h3>100% Money Back</h3>
                        <p>If the item didnt suit you</p>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    );
}
