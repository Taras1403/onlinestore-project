import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const heroImages = [
    '/images/hero-banner.webp',         //image hero-banner
    '/images/hero-banner-2.webp',       //image hero-banner 
];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search status
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // image
  const [isFading, setIsFading] = useState(false);
  const { addToCart } = useContext(CartContext);

  // image hero-banner
  useEffect(() => {
        const intervalId = setInterval(() => {
            setIsFading(true); 
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
                setIsFading(false); 
            }, 1000);
        }, 15000); 

        return () => clearInterval(intervalId);
    }, []);

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
  //const handleSearchChange  = (e) => {
  //  setSearchQuery(e.target.value);
  //};

  const currentImage = heroImages[currentImageIndex]; //image hero-banner

  // Add to cart without going to the product page
  const handleAddToCart = (e, product) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(product);
    console.log('Added to cart:', product.name);
  };

  return (
  <>
    <div className="hero-banner">
        <div className="hero-content-wrapper">
          <div className="hero-text-container">
            <h1>The new gadgets are here!</h1>
            <p>Discover new possibilities with our technological innovations.</p>
            <Link to="/">Learn more</Link>
          </div>
          <div className="hero-image-container">
            <img key={currentImage} src={currentImage} alt="Hero Product" className={`hero-image ${isFading ? 'fading' : ''}`}/>
          </div>
        </div>
    </div>

    <h1>New on the Online store</h1>
    
    <div className='main-content'>
      {/*Search for products*/}

      {/*
      <div className='search-section'>
        <h2>Products</h2>
        <input type="text" placeholder="Search for products..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
      </div>
      */}

      {/* Product grid */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`} className="product-card">
              <img src={product.image} alt={product.name} style={{ width: '70px' }} />
              <div class="product-info">
                <h3>{product.name}</h3>
                {/*<p>{product.description}</p>*/}
                
                  <div className="product-actions-bottom">
                    <div className="product-price-container">
                      From ${product.price}
                    </div>
                    <img src="./images/follow.svg" alt="Follow" className="add-follow-icon" />
                    <img src="./images/shop.svg" alt="Add to cart" className="add-to-cart-icon" onClick={(e) => handleAddToCart(e, product)}/>
                  </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found. Add them via API.</p>
        )}
      </div>
    </div>
  </>
  );
};

export default ProductList;