import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner"; // Import your enhanced Banner component

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
  { id: 14, name: "childern in yellow", price: 1500, image: "/Images/childern in yellow.jpg" },
  { id: 15, name: "Family in White", price: 3500, image: "/Images/family in purple.jpg" },
  { id: 16, name: "childern bng", price: 3500, image: "/Images/childern bng.jpg" },
  { id: 17, name: "Couple in red", price: 1500, image: "/Images/couple in red.jpg" },
  { id: 18, name: "couple in suit", price: 1500, image: "/Images/couple in suit.jpg" },
  { id: 19, name: "family in stunning outfits", price: 1500, image: "/Images/family in stunning outifts.jpg" },
  { id: 20, name: "girl in pink", price: 1500, image: "/Images/girl in pink.jpg" },
  { id: 21, name: "men in black", price: 1500, image: "/Images/men in black.jpg" },
  { id: 21, name: "men in dark blue", price: 1500, image: "/Images/men in dark blue.jpg" },
  { id: 21, name: "men in long slave", price: 1500, image: "/Images/men long slave .webp" },
  { id: 21, name: "men in black", price: 1500, image: "/Images/men.jpg" },
];

const Home = ({ addToCart }) => {
  const [likedItems, setLikedItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);

  // Animation for products appearing on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="homepage">
      {/* Use your enhanced Banner component */}
      <Banner />

      {/* Success Notification */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <i className="fas fa-check-circle"></i>
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">
            Handpicked pieces that celebrate African heritage and modern style
          </p>
        </div>
        
        <div className="product-grid">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button
                    className="quick-view-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                  <button
                    className={`like-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    <i className={`${likedItems.includes(product.id) ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">R {product.price.toLocaleString()}</p>
                <div className="product-actions">
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fas fa-shopping-bag"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Experience Authentic African Fashion</h2>
          <p>Join thousands of customers who have made Rootedlane their go-to destination for premium African-inspired clothing.</p>
          <div className="cta-stats">
            <div className="stat">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Authentic Designs</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Unique Styles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;