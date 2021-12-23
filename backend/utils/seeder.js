const Product = require('../models/products');
const dotenv = require('dotenv');
const products = require('../data/product.json');
const {connect} = require('mongoose');
const connectDatabase = require('../config/database');
dotenv.config({ path: "backend/config/config.env" });    
connectDatabase();
const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log('products are deleted');
        await Product.insertMany(products);
        console.log('products are added');

    }catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedProducts();