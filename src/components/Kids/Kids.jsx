import React, { useState } from "react";
import "./kids.css";
import Footer from "../Footer/Footer";

const products = [
  { id: 1, name: "Kids Clothing", price: 800, image: "/Images/three kids.jpeg" },
  { id: 2, name: "two kids     ", price: 1000, image: "/Images/two kids.jpeg" },
  { id: 3, name: "childern bng", price: 3500, image: "/Images/childern bng.jpg" },
   { id:4, name: "childern in yellow", price: 1500, image: "/Images/childern in yellow.jpg" },
   { id: 5, name: "girl in pink", price: 1500, image: "/Images/girl in pink.jpg" },
];

const Home = ({ addToCart }) => {
  const [likedItems, setLikedItems] = useState([]);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  
  return (
    <>
      <div className="homepage">
        <h2>Kids</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>R {product.price}</p>
              <div className="product-actions">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button
                  className={`like-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                  onClick={() => toggleLike(product.id)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Home;