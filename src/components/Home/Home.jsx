import React, { useState } from "react";
import Footer from "../Footer/Footer";

const products = [
  { id: 1, name: "Kids Clothing", price: 800, image: "/Images/three kids.jpeg" },
  { id: 2, name: "Couple Attire", price: 1500, image: "/Images/couples in light blue.jpeg" },
  { id: 3, name: "Family Attire", price: 2200, image: "/Images/family with 2 sons.jpeg" },
  { id: 4, name: "Two Kids", price: 1000, image: "/Images/two kids.jpeg" },
  { id: 5, name: "Mom and Daughter", price: 1500, image: "/Images/mom and daughter.jpeg" },
  { id: 6, name: "Couple in Black", price: 1500, image: "/Images/couples in black.jpeg" },
  { id: 7, name: "Family with 2 Kids", price: 3500, image: "/Images/family with2 kids.jpeg" },
  { id: 8, name: "Girl", price: 1500, image: "/Images/girls.jpeg" },
  { id: 9, name: "Guy in Dark Blue", price: 1500, image: "/Images/guy in dark blue.webp" },
  { id: 10, name: "Dress", price: 1000, image: "/Images/shopping (1).webp" },
  { id: 11, name: "Couple in Black Attire", price: 1500, image: "/Images/shopping (2).webp" },
  { id: 12, name: "Woman in Red Dress", price: 1500, image: "/Images/shopping.webp" },
  { id: 13, name: "Women Attire", price: 1500, image: "/Images/Women sitting.jpg" },
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
        {}
        <header className="home-header">
          <h1>Welcome to Our Store</h1>
          <p>Discover authentic African-inspired fashion for all occasions.</p>
        </header>

        {}
        <section className="featured-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">R {product.price}</p>
                  <div className="product-actions">
                    <button className="buy-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                    <button
                      className={`like-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                      onClick={() => toggleLike(product.id)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>


    </>
  );
};

export default Home;
