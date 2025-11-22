import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const products = [
  { id: 1, name: "Kids Clothing Set", price: 800, image: "/Images/three kids.jpeg" },
  { id: 2, name: "Couple Attire", price: 1500, image: "/Images/couples in light blue.jpeg" },
  { id: 3, name: "Family Matching Outfits", price: 2200, image: "/Images/family with 2 sons.jpeg" },
];

const Wishlist = ({ addToCart, user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const items = products.filter(product => wishlistIds.includes(product.id));
      setWishlistItems(items);
    }
  }, []);

  const removeFromWishlist = (id) => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const newWishlist = wishlistIds.filter(itemId => itemId !== id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please sign in to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("Added to cart!");
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <i className="far fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Add items you love to your wishlist</p>
            <button onClick={() => navigate('/')}>Start Shopping</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                  <button
                    className="remove-wishlist-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="wishlist-item-info">
                  <h3>{item.name}</h3>
                  <p className="wishlist-item-price">R {item.price.toLocaleString()}</p>
                  <button
                    className="add-to-cart-from-wishlist"
                    onClick={() => handleAddToCart(item)}
                  >
                    <i className="fas fa-shopping-bag"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;