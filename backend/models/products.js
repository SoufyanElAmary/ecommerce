const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
	name: {
		type : String,
		required : [true, "please entre your product"],
		trim : true,
		maxLenght : [100, "please name cannot exceed more than 100 caracter"]
	},
	price : {
		type : Number,
		required : [true, "please entre price"],
		maxLenght : [5, "please name cannot exceed more than 5 caracter"],
		default : 0.0
	},
	description : {
		type : String,
		required : [true, "please entre the description"]
	},
	rattings : {
		type : Number,
		default : 0.0
	},
	images:[
	{
		public_id:{
			type: String,
			required: true
		},
		url:{
			type: String,
			required: true
		}
	}],
	category: {
		type : String,
		required : [true, "please select category"],
		enum: {
			values: [
			"Electronics", "Cameras", "Laptop", "Accessories",
			"Headphones", "Food", "Books", "Clothes/shoes",
			"Beauty/Health", "Sport", "Outdoor", "Home"],
			message: "Please select a correct category for your product"
		}
	},
	seller: {
	    type : String,
		required : [true, "please entre product seller"]	
	},
	stock: {
		type : Number,
		required : [true, "please entre product stock"],
		maxLenght : [5, "please stock cannot exceed more than 5 caracter"],
		default: 0.0
	},
	numOfReviews: {
		type : Number,
		default: 0.0
	},
	reviews: [
	{
		name: {
			type:String,
			required: true
		},
		ratting:{
			type:Number,
			required:true
		},
		comment:{
			type:String,
			require:true
		}
	}],
	createdAt:{
		type:Date,
		default:Date.new
	}
});
product=mongoose.model("product", productSchema);
module.exports = product;