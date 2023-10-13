import React, { useEffect, useState } from "react";
import "../styles/catalogue.css";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/Navbar";

const Catalogue = () => {
  const [products, setProducts] = useState([]);

  const callCataloguePage = async () => {
    try {
      const res = await fetch("https://vitalife-api.onrender.com/getAllProducts", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setProducts(data.data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callCataloguePage();
  }, []);
   return (
    <>
    {/* <NavBar/> */}
    <div className="catalogue">
      <div className="catalogue-grid">
        {products.map((product) => (
          (product.volume > 0 ? <ProductCard key={product._id} product={product}/> : '')
        ))}
      </div>
    </div>
    </>
  );
};

export default Catalogue;
