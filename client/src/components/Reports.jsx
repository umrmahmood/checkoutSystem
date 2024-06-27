import React, { useState } from "react";
import axios from "axios";

const Report = () => {
	const [report, setReport] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [transactionsVisible, setTransactionsVisible] = useState(false);

	const fetchReport = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get("http://localhost:3002/report");
			setReport(response.data);
			setTransactionsVisible(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const generateSummary = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get("http://localhost:3002/report");
			// setReport(response.data);
			const fetchedReport = response.data;

			const registerSummary = fetchedReport.reduce((acc, transaction) => {
				const { registerId, total } = transaction;
				if (!acc[registerId]) {
					acc[registerId] = { totalTransactions: 0, totalSales: 0 };
				}
				acc[registerId].totalTransactions += 1;
				acc[registerId].totalSales += total;
				return acc;
			}, {});

			const summaryData = {
				totalTransactions: fetchedReport.length,
				totalSales: fetchedReport.reduce(
					(acc, transaction) => acc + transaction.total,
					0
				),
				registersUsed: Object.keys(registerSummary).map((registerId) => ({
					registerId,
					...registerSummary[registerId],
				})),
			};

			setSummary(summaryData);
			setTransactionsVisible(false);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const getBackgroundColor = (registerId) => {
		const id = Number(registerId);
		switch (id) {
			case 1:
				return "lightblue";
			case 2:
				return "yellow";
			case 3:
				return "salmon";
			default:
				return "white";
		}
	};

	return (
		<div>
			<h1>MyStore Checkout System</h1>
			<div className="report-buttons">
				<button className="button-6" onClick={fetchReport} disabled={loading}>
					{loading ? "Loading..." : "Generate All Transactions"}
				</button>
				<button
					className="button-6"
					onClick={generateSummary}
					disabled={loading}
				>
					{loading ? "Loading..." : "Generate Daily Report"}
				</button>
			</div>
			{error && <p>Error: {error}</p>}
			{transactionsVisible && (
				<div className="card-container">
					{report.map((transaction, index) => (
						<div className="card-outter" key={index}>
							<h3
								className="card-heading"
								style={{
									backgroundColor: getBackgroundColor(transaction.registerId),
								}}
							>
								Register Id: {transaction.registerId}
							</h3>
							<p>Transaction Id: {transaction.transactionId}</p>
							<p>{transaction.timeStamp}</p>
							<div>
								<ul className="list-items">
									{transaction.items.map((item, itemIndex) => (
										<li className="list-item" key={itemIndex}>
											<span className="product-name">{item.productName}</span>
											<span className="price">{item.price}€</span>
											<span className="quantity">x {item.quantity}</span>
											<span className="total">
												{(item.price * item.quantity).toFixed(1)}€
											</span>
										</li>
									))}
								</ul>
							</div>
							<h3>Total Amount: {transaction.total.toFixed(2)}€</h3>
						</div>
					))}
				</div>
			)}
			{summary && (
				<div className="summary card-outter">
					<h2>Summary for the Whole Day</h2>
					<table className="summ-table">
						<tbody>
							<tr>
								<td>Total Transactions</td>
								<td>{summary.totalTransactions}</td>
							</tr>
							<tr>
								<td>Total Sales</td>
								<td>{summary.totalSales.toFixed(2)}€</td>
							</tr>
							<tr>
								<td>Registers Used</td>
								<td>{summary.registersUsed.length}</td>
							</tr>
							<tr>
								<td>Register IDs</td>
								<td>
									{summary.registersUsed
										.map((register) => `${register.registerId}`)
										.join(", ")}
								</td>
							</tr>
						</tbody>
					</table>

					<h3>Detailed Breakdown</h3>
					{summary.registersUsed.map((register) => (
						<div key={register.registerId}>
							<h4
								style={{
									backgroundColor: getBackgroundColor(register.registerId),
								}}
							>
								Register ID {register.registerId}
							</h4>
							<table className="summ-table">
								<tbody>
									<tr>
										<td>Total Transactions</td>
										<td>{register.totalTransactions}</td>
									</tr>
									<tr>
										<td>Total Sales</td>
										<td>{register.totalSales.toFixed(2)}€</td>
									</tr>
								</tbody>
							</table>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Report;
