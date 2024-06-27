const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionItemSchema = new Schema({
	productName: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const transactionSchema = new Schema(
	{
		registerId: { type: Number, required: true },
		total: { type: Number, required: true },
		items: [transactionItemSchema],
		transactionId: { type: Number },
	},
	{ timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };


// Schema based on the ERD model

//Register Schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const RegisterSchema = new Schema({
//   registerId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   registerName: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Register', RegisterSchema);


//Product Schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   productId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   productName: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Product', ProductSchema);

//Transaction Schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TransactionSchema = new Schema({
//   transactionId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   registerId: {
//     type: String,
//     required: true,
//     ref: 'Register',
//   },
//   total: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Transaction', TransactionSchema);

//Transaction Schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TransactionItemSchema = new Schema({
//   transactionId: {
//     type: String,
//     required: true,
//     ref: 'Transaction',
//   },
//   productId: {
//     type: String,
//     required: true,
//     ref: 'Product',
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// module.exports = mongoose.model('TransactionItem', TransactionItemSchema);
