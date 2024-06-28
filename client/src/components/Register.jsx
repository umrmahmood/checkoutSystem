import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import shop from "../assets/sp2.png";

const Register = () => {
	const navigate = useNavigate();
	const [registerId, setRegisterId] = useState("");
	const [registerName, setRegisterName] = useState("");
	const [itemsToScan, setItemsToScan] = useState([]);
	const [currentItemName, setCurrentItemName] = useState("");
	const [currentItemPrice, setCurrentItemPrice] = useState("");
	const [currentItemQuantity, setCurrentItemQuantity] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [receipt, setReceipt] = useState(null);
	const [loginText, setLoginText] = useState(null);
	const [placeholder, setPlaceholder] = useState("Enter Id");
	const [placeholderName, setPlaceholderName] = useState("Enter Name");
	const [showUserBox, setShowUserBox] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const handleRegisterSubmit = () => {
		const newRegister = { registerId, registerName, purchases: [] };
		setTransactions([...transactions, newRegister]);
		setLoginText("You have successfully logged in!");
		setIsLoggingIn(true);

		// Set timeout to show the user-box after 3 seconds
		setTimeout(() => {
			setIsLoggingIn(false);
			setShowUserBox(true);
		}, 2000);
	};

	const handleItemSubmit = (e) => {
		e.preventDefault();
		const newItem = {
			productName: currentItemName,
			price: parseFloat(currentItemPrice),
			quantity: currentItemQuantity,
		};
		setItemsToScan([...itemsToScan, newItem]);
		setCurrentItemName("");
		setCurrentItemPrice("");
		setCurrentItemQuantity("");
	};

	const handleTransaction = async () => {
		const register = transactions.find((reg) => reg.registerId === registerId);
		const updatedRegister = scanItems(register, itemsToScan);
		await transmitToCentralServer(updatedRegister);
		setItemsToScan([]);
	};

	const scanItems = (register, items) => {
		return {
			...register,
			purchases: [...register.purchases, ...items],
		};
	};

	const transmitToCentralServer = async (register) => {
		const { registerId, purchases } = register;
		try {
			const response = await axios.post("/api/transactions", {
				registerId,
				purchases,
			});
			console.log(`Transaction sent successfully:`, response.data);
			printReceipt(register);
		} catch (error) {
			console.error("Error transmitting to central system:", error);
		}
	};

	const printReceipt = (register) => {
		const receipt = {
			registerId: register.registerId,
			items: register.purchases,
			total: calculateTotal(register.purchases),
		};
		console.log(
			`Register ${register.registerId} (${register.registerName}) printing receipt:`,
			receipt
		);
		setReceipt(receipt);
	};

	const calculateTotal = (items) => {
		return items.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const onClickHandler = () => {
		navigate("/report");
	};
	return (
		<div>
			{" "}
			<div>
				<button className="button-6 server-btn" onClick={onClickHandler}>
					Go to Main Server
				</button>
			</div>
			<div className="shop-img">
				<img src={shop} alt="shop" />
			</div>
			{!loginText && (
				<div className="login-box login-box-position">
					<h2>Please Login</h2>
					<div className="user-box">
						<input
							type="text"
							placeholder={placeholder}
							value={registerId}
							onChange={(e) => setRegisterId(e.target.value)}
							onFocus={() => setPlaceholder("")}
							onBlur={() => {
								if (registerId === "") {
									setPlaceholder("Enter Id");
								}
							}}
						/>
					</div>

					<div className="user-box">
						<input
							type="text"
							placeholder={placeholderName}
							value={registerName}
							onChange={(e) => setRegisterName(e.target.value)}
							onFocus={() => setPlaceholderName("")}
							onBlur={() => {
								if (registerName === "") {
									setPlaceholderName("Enter name");
								}
							}}
						/>
					</div>

					<button className="button-6" onClick={handleRegisterSubmit}>
						Login
					</button>

					<div className="login-confirm">{registerId && loginText}</div>
				</div>
			)}
			{isLoggingIn && (
				<div className="login-box">
					<h3>Logging in ...</h3>
				</div>
			)}
			{showUserBox && (
				<div className="login-box scan-box">
					<h2>Scan Items</h2>
					<form onSubmit={handleItemSubmit}>
						<div className="user-box">
							<input
								type="text"
								placeholder="Item Name"
								value={currentItemName}
								onChange={(e) => setCurrentItemName(e.target.value)}
							/>
						</div>

						<div className="user-box">
							<input
								type="number"
								placeholder="Item Price"
								value={currentItemPrice}
								onChange={(e) => setCurrentItemPrice(e.target.value)}
							/>
						</div>

						<div className="user-box">
							<input
								type="number"
								placeholder="Item Quantity"
								value={currentItemQuantity}
								onChange={(e) => setCurrentItemQuantity(e.target.value)}
							/>
						</div>

						<button className="button-6" type="submit">
							Add Item
						</button>
					</form>
					<ul className="list-items scanned-list">
						{itemsToScan.map((item, index) => (
							<li className="list-item scanned-item" key={index}>
								{item.productName} - ${item.price.toFixed(2)}- {item.quantity}
							</li>
						))}
					</ul>
					<button className="button-6" onClick={handleTransaction}>
						Process Transaction
					</button>
				</div>
			)}
			{receipt && (
				<div className="card-outter receipt-width">
					<h2 className="card-heading">Receipt</h2>
					<p>Register ID: {receipt.registerId}</p>
					<table>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{receipt.items.map((item, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "even-row" : "odd-row"}
								>
									<td>{item.productName}</td>
									<td>{item.price}€</td>
									<td>{item.quantity}</td>
									<td>{(item.price * item.quantity).toFixed(1)}€</td>
								</tr>
							))}
						</tbody>
					</table>
					<p>Total: ${receipt.total.toFixed(2)}</p>
				</div>
			)}
		</div>
	);
};

export default Register;
