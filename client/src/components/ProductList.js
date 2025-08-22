import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          //Search
          const url = searchQuery ? `http://localhost:3001/api/products?q=${searchQuery}` : `http://localhost:3001/api/products`;
          const res = await axios.get(url);
          setProducts(res.data);
      } catch (error) {
        console.error('Error when receiving goods:', error);
      }
    };
    fetchProducts();
  }, [searchQuery]); // useEffect reacts to changes in searchQuery
  
  //Search
  const handleSearchChange  = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/*Search for products*/}
      <input type="text" placeholder="Search for products..." value={searchQuery} onChange={handleSearchChange} className="search-input" />

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
    </div>
  );
};

export default ProductList;