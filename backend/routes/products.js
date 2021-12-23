const express = require('express');
const router = express.Router();
const isAuthenticatedUser = require('../middleware/auth');
const {getProducts, newProduct, getSingleProduct,updateProduct,deleteProduct}  = require('../controllers/productsController');
router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/admin/product/new').post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProduct);
module.exports=router;