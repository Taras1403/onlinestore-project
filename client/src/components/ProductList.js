import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error when receiving goods:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`} className="product-card">
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} style={{ width: '200px' }} />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </Link>
          ))
        ) : (
          <p>No products found. Add them via API.</p>
        )}
      </div>
  );
};

export default App;