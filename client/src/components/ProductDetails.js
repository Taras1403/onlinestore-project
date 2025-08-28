import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { CartContext } from "../context/CartContext";
import { toast } from 'react-toastify';

import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams(); // id url
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error when receiving goods:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Add to cart
    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Item added to cart!'); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} style={{ width: '400px'}} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>In stock: {product.countInStock}</p>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Shop cart</button>
        </div>
    );
};

export default ProductDetails;