import React, { useContext } from "react";
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add authorization header
        },
      };

      const orderData = {
        orderItems: cartItems,
        totalPrice,
      };

      await axios.post('http://localhost:3001/api/orders', orderData, config);

      clearCart(); // Clear the basket after a successful order
      navigate('/'); // Redirect to the home page

    } catch (error) {
      console.error('Error when placing an order:', error);
      alert('The order could not be processed. Please try again.');
    }
  };

    if (cartItems.length === 0) {
        return <div className="cart-container">
            <h2>Your cart is empty</h2>
        </div>
    }

    return (
    <div className="cart-container">
      <h2>Your basket</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
            <button onClick={() => removeFromCart(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total amount: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handlePlaceOrder} className="order-btn">Place an order</button>
      </div>
    </div>
  );
};

export default Cart;