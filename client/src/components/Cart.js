import React, { useContext } from "react";
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
      </div>
    </div>
  );
};

export default Cart;