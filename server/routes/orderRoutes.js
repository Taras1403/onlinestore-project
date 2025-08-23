const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Creating a new order
router.post('/', protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'Немає товарів для замовлення' });
    return;
  }
  try {
    const order = new Order({
      user: req.user.id, // User ID from token
      orderItems: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id, // Product ID from database
      })),
      totalPrice: totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

module.exports = router;