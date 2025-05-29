const Product = require('../models/Product');

exports.findProducts = async(req, res) => {
    const products = await Product.find();
    res.json(products);
}

exports.findProductById = async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product)res.json(product);
    else res.json({message : 'Product Not Found'});
}
