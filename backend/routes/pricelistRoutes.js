const express = require('express');
const router = express.Router();
const { getAllItems, updateItem } = require('../controllers/pricelistController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getAllItems);
router.put('/:id', authMiddleware, updateItem);

// router is like module controller in express, handles get post req
module.exports = router;