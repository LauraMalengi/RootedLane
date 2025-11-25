import React, { useState, useEffect } from "react";
import "./kids.css";

const products = [
  { id: 1, name: "Kids Clothing", price: 800, image: "/Images/three kids.jpeg" },
  { id: 2, name: "two kids", price: 1000, image: "/Images/two kids.jpeg" },
  { id: 3, name: "childern bng", price: 3500, image: "/Images/childern bng.jpg" },
  { id: 4, name: "childern in yellow", price: 1500, image: "/Images/childern in yellow.jpg" },
  { id: 5, name: "girl in pink", price: 1500, image: "/Images/girl in pink.jpg" },
  { id: 6, name: "Native african Style for kids", price: 2000, image: "/Images/Native african Style for kids.png" },
];

const Kids = ({ onAddToCart }) => {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setLikedItems(JSON.parse(savedWishlist));
    }
  }, []);

  const toggleLike = (id) => {
    const newLikedItems = likedItems.includes(id)
      ? likedItems.filter((item) => item !== id)
      : [...likedItems, id];

    setLikedItems(newLikedItems);
    localStorage.setItem("wishlist", JSON.stringify(newLikedItems));
  };

  return (
    <div className="homepage">
      <h2>Kids</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />

            <h3>{product.name}</h3>
            <p className="price">R {product.price}</p>

            <div className="product-actions">
              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                AddToCart
              </button>

              <button
                className={`wishlist-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                onClick={() => toggleLike(product.id)}
              >
                <i className={`${likedItems.includes(product.id) ? "fas" : "far"} fa-heart`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;
