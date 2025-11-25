import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";

const products = [
  { id: 1, name: "Kids Clothing Set", price: 800, image: "/Images/three kids.jpeg" },
  { id: 2, name: "Couple Attire", price: 1500, image: "/Images/couples in light blue.jpeg" },
  { id: 3, name: "Family Matching Outfits", price: 2000, image: "/Images/family with 2 sons.jpeg" },
  { id: 4, name: "Kids Duo Set", price: 850, image: "/Images/two kids.jpeg" },
  { id: 5, name: "African wedding attire", price: 800, image: "/Images/African wedding attirs.png" },
  { id: 6, name: "Couple Duo set", price: 1500, image: "/Images/couples in black.jpeg" },
  { id: 7, name: "Family of Four Set", price: 3500, image: "/Images/family with2 kids.jpeg" },
  { id: 8, name: "African ladies dress", price: 1000, image: "/Images/girls.jpeg" },
  { id: 9, name: "Men's Dark Blue Outfit", price: 1500, image: "/Images/guy in dark blue.webp" },
  { id: 10, name: "Elegant Dress", price: 1000, image: "/Images/shopping (1).webp" },
  { id: 11, name: "Couple Black Attire", price: 1500, image: "/Images/shopping (2).webp" },
  { id: 12, name: "Native african Style for kids", price: 2000, image: "/Images/Native african Style for kids.png" },
  { id: 13, name: "Xhosa Women's Attire", price: 1500, image: "/Images/Women sitting.jpg" },
  { id: 14, name: "Children's african outfit", price: 1500, image: "/Images/childern in yellow.jpg" },
  { id: 15, name: "Igbo Traditional Clothing", price: 3000, image: "/Images/Igbo Traditional Clothing.png" },
  { id: 16, name: "Children's Outfit", price: 3500, image: "/Images/childern bng.jpg" },
  { id: 17, name: "Couple in Red", price: 1500, image: "/Images/couple in red.jpg" },
  { id: 18, name: "Couple in Suit", price: 1500, image: "/Images/couple in suit.jpg" },
  { id: 19, name: "Family Stunning Outfits", price: 1500, image: "/Images/family in stunning outifts.jpg" },
  { id: 20, name: "African girl", price: 1500, image: "/Images/girl in pink.jpg" },
  { id: 21, name: "Men's African outfit", price: 1500, image: "/Images/men in black.jpg" },
  { id: 22, name: "nigerian's traditional outfit", price: 1500, image: "/Images/men in dark blue.jpg" },
  { id: 23, name: "Men's long slave shirt", price: 600, image: "/Images/men long slave .webp" },
  { id: 24, name: "Men's Casual Wear", price: 1500, image: "/Images/men.jpg" },
  { id: 25, name: "Modern Indian Clothing", price: 2000, image: "/Images/Modern Indian Clothing.png" },
  { id: 26, name: "Indian Traditional dress", price: 2500, image: "/Images/Indian Traditional dress.png" },
  { id: 27, name: "Family in White", price: 3500, image: "/Images/family in purple.jpg" },
  { id: 28, name: "Flower Floral Africa dress", price: 3500, image: "/Images/Flower Floral Africa dress.png" },
  { id: 29, name: "South African Couples in Matching Wedding Attire", price: 3000, image: "/Images/South African Couples in Matching Wedding Attire.png" },
  { id: 30, name: "Mom and Daughter Set", price: 1500, image: "/Images/mom and daughter.jpeg" },
  { id: 31, name: "African clothing family set", price: 3000, image: "/Images/African clothing family set.png" },
  { id: 32, name: "Women's Red Dress", price: 1500, image: "/Images/shopping.webp" },
  
];

const Home = ({ addToCart, user }) => {
  const [likedItems, setLikedItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setLikedItems(JSON.parse(savedWishlist));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const toggleLike = (id) => {
    const newLikedItems = likedItems.includes(id)
      ? likedItems.filter((item) => item !== id)
      : [...likedItems, id];

    setLikedItems(newLikedItems);
    localStorage.setItem("wishlist", JSON.stringify(newLikedItems));
  };

  const handleAddToCart = (product) => {
  console.log("Add to cart clicked for:", product.name);
  addToCart(product);
  setShowNotification(true);
  console.log("Notification should be visible");
  setTimeout(() => {
    setShowNotification(false);
    console.log("Notification hidden");
  }, 3000);
    
  };

  return (
    <div className="homepage">
      <Banner />

      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <i className="fas fa-check-circle"></i>
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      <section className="featured-section">
        <div className="section-header">
          <br />
          <br />
          <h2 className="section-title">Featured Collection</h2>
          {/* <p className="section-subtitle">
            Handpicked pieces that celebrate African heritage and modern style
          </p> */}
        </div>
        <br />

        <div className="product-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">R {product.price.toLocaleString()}</p>

                <div className="product-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >AddToCart
                  </button>

                  <button
                    className={`wishlist-btn ${
                      likedItems.includes(product.id) ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(product.id)}
                  >
                    <i
                      className={`${
                        likedItems.includes(product.id) ? "fas" : "far"
                      } fa-heart`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
