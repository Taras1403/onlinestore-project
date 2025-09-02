const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (for the admin)
router.post('/', async (req, res) => {

    console.log('Body of the request:', req.body);

    try {
        const { name, description, price, image, category, countInStock } = req.body;
        const newProduct = new Product({ name, description, price, image, category, countInStock });
        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error when creating a product' });
    }
});
// @route   PUT /api/products/:id
// @desc     Update product by ID
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, image, category, countInStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.image = image || product.image;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Товар не знайдено' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete product by ID
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'Товар видалено' });
        } else {
            res.status(404).json({ message: 'Товар не знайдено' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// @route   GET /api/products
// @desc    Receive all goods
// @access  Public
router.get('/', async (req, res) => {
    try {
        console.log('Search query received:', req.query.q);
        const keyword = req.query.q ? {                             // Search
            name: {                                                 // Search
                $regex: req.query.q,                                // Search
                $options: 'i' // makes the search case-insensitive  // Search
            }                                                       // Search
        } : {}; // if the request is empty, return all products.    // Search

        const products = await Product.find({ ...keyword });        // Search

        const productsWithImageUrls = products.map(product => {     //Forming the URL of an image
            return {
                ...product._doc, // We distribute existing product data
                image: `http://localhost:3001/images/${product.image}`
            };
        });

        res.json(productsWithImageUrls);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/products/:id
// @desc    Receive one item by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;