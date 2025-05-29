const express = require('express');
const { findProducts, findProductById } = require('../controllers/productController');
const router = express.Router();

router.get('/', findProducts);
router.get('/:id', findProductById);

module.exports = router;