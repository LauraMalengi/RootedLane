import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LogIn from './components/LogIn/LogIn';
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
import Cart from './components/cart/Cart';
import Checkout from "./components/checkout/Checkout";

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/signin", "/signup", "/logIn", "/signUp"].includes(location.pathname.toLowerCase());

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
        <Navbar cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
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
        <Route path="/" element={<Homepage onAddToCart={handleAddToCart} />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/family" element={<Family />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        {}
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
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
