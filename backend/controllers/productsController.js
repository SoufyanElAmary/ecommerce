const res = require("express/lib/response");
const Product = require("../models/products");
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFreatures = require('../utils/apiFeatures');
// create new product => /api/v1/product/new
newProduct = catchAsyncErrors( async(req, res, next) => {
		const product = await Product.create(req.body);
		res.status(201).json({
			success: true,
			product
		})
});

getProducts = catchAsyncErrors( async(req, res, next)=>{
		const resPerPage = 4;
		const productCount = await Product.countDocuments();
		const Apifeature = new APIFreatures(Product.find(),req.query)
		.search()
		.filter()
		.pagination(resPerPage);
		products = await Apifeature.query;

		res.status(200).json({
			success:true,
			length : products.length,
			products : products,
			productCount
		})


})
//get single product details = /api/v1/product/:id
getSingleProduct = catchAsyncErrors(async function (req, res , next){
	const product = await Product.findById(req.params.id);
	if(!product){
		return next(new ErrorHandler('Product not found',404));
			} 
	res.status(200).json({
		success:true,
		product
		})
})

//  update Product = /api/v1/product/:id
updateProduct = catchAsyncErrors(async function(req,res){
	let product = await Product.findById(req.params.id);
	if(!product){
		next(new ErrorHandler('Product not found',404));
	
		}
	else{
		product= await Product.findByIdAndUpdate(req.params.id,req.body,{
			new:true,
			runValidators:true,
			useFindAndModify:false
		});
		res.status(200).json({
			success:true,
			product
		})
		}
})
//  delete Product = /api/v1/product/:id
deleteProduct =  catchAsyncErrors(async function(req,res,next){
	let product = await Product.findById(req.params.id);
	if(!product){
		next(new ErrorHandler('Product not found',404));
	}
	else{
		product.remove();
		res.status(200).json({
			succes:true,
			message:"product is deleted"
		});
	}
})
module.exports = {getProducts, newProduct,getSingleProduct,updateProduct,deleteProduct};