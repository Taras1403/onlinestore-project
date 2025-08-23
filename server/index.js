const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // download .env

const app = express();
const PORT = process.env.PORT || 3001;

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// middlewares
app.use(express.json());
app.use(cors());

// import
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');   // auth/login
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);   
app.use('/api/auth', authRoutes);                    // auth/login
app.use('/api/orders', orderRoutes);
    
// Запуск сервера
app.get('/', (req, res) => {
    res.send('The server is working!');
});

app.listen(PORT, () => {
    console.log(`The server runs on port ${PORT}`);
});