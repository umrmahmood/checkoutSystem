import express from "express";
import Transaction from "./models.js";

const router = express.Router();
// Receive purchase data from registers
router.post("/transactions", async (req, res) => {
	const { registerId, purchases } = req.body;

	try {
		const total = purchases.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const transactionId = Math.floor(10000000 + Math.random() * 90000000);
		const transaction = new Transaction({
			registerId,
			total,
			items: purchases,
			transactionId,
		});
		await transaction.save();

		res.status(201).json({ message: "Transaction recorded successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error recording transaction" });
	}
});

// Generate daily report
router.get("/report", async (req, res) => {
	try {
		const transactions = await Transaction.find();

		const report = transactions.map((transaction) => ({
			registerId: transaction.registerId,
			transactionId: transaction.transactionId,
			total: transaction.total,
			timeStamp: new Date(transaction.createdAt).toLocaleString(),
			items: transaction.items.map((item) => ({
				productName: item.productName,
				price: item.price,
				quantity: item.quantity,
			})),
		}));
		console.log(report);
		res.status(200).json(report);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error generating report" });
	}
});

// Route to get report by registerId
router.get("/report/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const transactions = await Transaction.find({ registerId: parseInt(id) });

		const report = transactions.map((transaction) => ({
			registerId: transaction.registerId,
			total: transaction.total,
			items: transaction.items.map((item) => ({
				productName: item.productName,
				price: item.price,
				quantity: item.quantity,
			})),
		}));

		res.status(200).json(report);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error generating report" });
	}
});

export default router;
