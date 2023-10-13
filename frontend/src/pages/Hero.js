import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/Navbar";
import Home from "./Home";
import Testimonial from "./Testimonial";
import Offer from "./Offer";
import Contact from "./Contact";
import "../styles/hero.css";

export default function Hero() {
  const testimonialsectionRef = useRef(null);
  const offersectionRef = useRef(null);

    const [showNav , setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0.2) {
            setShowNav(true);
          } else {
            setShowNav(false);
          }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
  return (
    <div className="hero">
      <div className="hero-navbar">
        {/* {showNav? <NavBar/> : ""} */}
        {/* <NavBar/> */}
      </div>

      <div className="hero-section hero-homepage">
        <Home 
        offersectionRef = {offersectionRef}
        />
      </div>
      
      <div className="hero-section hero-offer" ref={offersectionRef}>
        <Offer />
      </div>

      <div className="hero-section hero-testimonial" ref={testimonialsectionRef}>
        <Testimonial />
      </div>

      <div className="hero-section hero-contact">
        <Contact />
      </div>
    </div>
  );
}
