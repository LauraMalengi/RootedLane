import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const products = [
  { id: 1, name: "Kids Clothing Set", price: 800, image: "/Images/three kids.jpeg" },
  { id: 2, name: "Couple Attire", price: 1500, image: "/Images/couples in light blue.jpeg" },
  { id: 3, name: "Family Matching Outfits", price: 2200, image: "/Images/family with 2 sons.jpeg" },
  { id: 4, name: "Kids Duo Set", price: 1000, image: "/Images/two kids.jpeg" },
  { id: 5, name: "Mom and Daughter Set", price: 1500, image: "/Images/mom and daughter.jpeg" },
  { id: 6, name: "Couple in Black", price: 1500, image: "/Images/couples in black.jpeg" },
  { id: 7, name: "Family of Four Set", price: 3500, image: "/Images/family with2 kids.jpeg" },
  { id: 8, name: "Girls Dress", price: 1500, image: "/Images/girls.jpeg" },
  { id: 9, name: "Men's Dark Blue Outfit", price: 1500, image: "/Images/guy in dark blue.webp" },
  { id: 10, name: "Elegant Dress", price: 1000, image: "/Images/shopping (1).webp" },
  { id: 11, name: "Couple Black Attire", price: 1500, image: "/Images/shopping (2).webp" },
  { id: 12, name: "Women's Red Dress", price: 1500, image: "/Images/shopping.webp" },
  { id: 13, name: "Women's Attire", price: 1500, image: "/Images/Women sitting.jpg" },
  { id: 14, name: "Children in Yellow", price: 1500, image: "/Images/childern in yellow.jpg" },
  { id: 15, name: "Family in White", price: 3500, image: "/Images/family in purple.jpg" },
  { id: 16, name: "Children's Outfit", price: 3500, image: "/Images/childern bng.jpg" },
  { id: 17, name: "Couple in Red", price: 1500, image: "/Images/couple in red.jpg" },
  { id: 18, name: "Couple in Suit", price: 1500, image: "/Images/couple in suit.jpg" },
  { id: 19, name: "Family Stunning Outfits", price: 1500, image: "/Images/family in stunning outifts.jpg" },
  { id: 20, name: "Girl in Pink", price: 1500, image: "/Images/girl in pink.jpg" },
  { id: 21, name: "Men in Black", price: 1500, image: "/Images/men in black.jpg" },
  { id: 22, name: "Men in Dark Blue", price: 1500, image: "/Images/men in dark blue.jpg" },
  { id: 23, name: "Men's Long Sleeve", price: 1500, image: "/Images/men long slave .webp" },
  { id: 24, name: "Men's Casual Wear", price: 1500, image: "/Images/men.jpg" },
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