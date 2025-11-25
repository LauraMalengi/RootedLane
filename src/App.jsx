// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Signup from "./components/SignUp/SignUp";
import Homepage from "./Page/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; 
import Family from "./components/Family/Family";
import Men from "./components/Men/Men";
import Women from "./components/Women/Women";
import Kids from "./components/Kids/Kids";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import OrderProcess from "./components/OrderProcess/Orderprocess";
import AboutUs from "./components/About/AboutUs";
import ContactUs from "./components/Contact/ContactUs";
import Wishlist from './components/wishlist/Wishlist';
import Collection from './components/Collection/Collection';

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('ip', '13.218.56.217');
    window.history.pushState({}, '', url);
  }, []);

  const hideNavAndFooter = ["/login", "/signin", "/signup", "/logIn", "/signUp"].includes(
    location.pathname.toLowerCase()
  );

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {!hideNavAndFooter && (
        <Navbar 
          cartCount={totalItems} 
          onCartClick={() => setIsCartOpen(true)} 
          user={user} 
          setUser={setUser} 
        />
      )}

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      )}

      <Routes>
        <Route path="/" element={<Homepage onAddToCart={handleAddToCart} user={user} />} />
        <Route path="/signUp" element={<Signup setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route path="/login" element={<LogIn setUser={setUser} />} />
        <Route path="/family" element={<Family addToCart={handleAddToCart} user={user} />} />
        <Route path="/men" element={<Men addToCart={handleAddToCart} user={user} />} />
        <Route path="/women" element={<Women addToCart={handleAddToCart} user={user} />} />
        <Route path="/kids" element={<Kids addToCart={handleAddToCart} user={user} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/Wishlist" element={<Wishlist addToCart={handleAddToCart} user={user} />} />
        <Route path="/Collection" element={<Collection />} />

        <Route 
          path="/checkout" 
          element={
            <Checkout 
              cartItems={cartItems} 
              updateCartItemQuantity={handleUpdateQuantity}
              removeFromCart={handleRemoveItem}
            />
          } 
        />
        <Route path="/order-process" element={<OrderProcess />} />
        <Route 
          path="/protected" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;