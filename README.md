# Supermarket Checkout System

## Project Overview
This project simulates the process of a supermarket checkout system, involving multiple registers and a central server. The system records transactions, prints receipts, and generates end-of-day reports.

## Features
- Multiple Registers (Clients): 
    - Each register can scan items, transmit purchases to a central server, and print receipts in real-time.

- Central Server: 
    - Receives and records transaction data from registers, and generates end-of-day reports.

- Item Scanning: 
    - Registers can scan multiple items in a loop.

- Receipt Printing: 
    - Generates and prints receipts for each transaction.

- End-of-Day Reporting: 
    - Central server generates reports summarizing all transactions for the day.

## Technologies Used

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Communication: HTTP

## Prerequisites
Node.js
MongoDB
npm (Node Package Manager)

## Getting Started

- Clone the Repository
git clone https://github.com/your-username/supermarket-checkout-system.git
- cd supermarket-checkout-system
- Install Dependencies
npm install
Run MongoDB
Ensure that MongoDB is running on your machine. You can start it using:
mongod --dbpath /path/to/your/db
- Environment Variables
Create a .env file in the root directory and add the following:
env
MONGO_URI=mongodb://localhost:27017/central_server
PORT=3000
### Start the Server
- npm start
### Run the React Frontend
Navigate to the client directory and install dependencies:

- cd client
- npm install

- Start the React development server: npm start

## Project Structure
```
supermarket-checkout-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── public/
├── models/                 # Mongoose schemas
│   ├── Product.js
│   ├── Register.js
│   ├── Transaction.js
│   └── TransactionItem.js
├── routes/                 # Express routes
│   └── transactions.js
├── .env                    # Environment variables
├── server.js               # Main server file
├── package.json
└── README.md
```

## API Endpoints
POST /transactions: Record a transaction from a register.

Request Body:
json
```
{
  "registerId": "string",
  "purchases": [
    {
      "productId": "string",
      "name": "string",
      "price": number,
      "quantity": number
    }
  ]
}
```

GET /report: Generate end-of-day report (to be implemented).

## Usage
### Register System (Frontend)
- Enter Register Details: Enter the register ID(1, 2 or 3) and name, then click "Submit Register".

- Scan Items: Enter the item name, price, and quantity, then click "Add Item". Repeat for all items.

- Process Transaction: Click "Process Transaction" to transmit data to the central server and print the receipt.

### Central Server (Backend)
- Receives transaction data from registers.

- Stores transaction details in MongoDB.

- Generates end-of-day reports on request.