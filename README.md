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
- Node.js
- MongoDB
- npm (Node Package Manager)
- Docker and Docker Compose

## Getting Started

- Clone the Repository
```
git clone https://github.com/umrmahmood/checkoutSystem
cd checkoutSystem
```
- Environment Variables
Create a .env file in the root directory and add the following:
```
MONGO_URI=mongodb://mongodb:27017/central_server
PORT=3002
```

## Using Docker Compose
- Ensure Docker and Docker Compose are installed on your machine. 
- To start the entire application stack, including the MongoDB database, backend, and frontend, run:

```
docker-compose up --build
```
This will start the following services:

- API: Runs on port 3002
- Client: Runs on port 3000
- Nginx: Serves the client on port 80

## Without Docker
- Install Dependencies
```
npm install
```

- Run MongoDB
Ensure that MongoDB is running on your machine. You can start it using:
```
mongod --dbpath /path/to/your/db
```

- Start the server
```
npm start
```
- Run the react frontend
Navigate to the client directory and install dependencies:
```
cd client
npm install
```
- Start the React development server:
```
npm start
```


## Project Structure
```
supermarket-checkout-system/
├── client
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   └── src
├── docker-compose.yml
├── nginx
│   ├── default.conf
│   └── Dockerfile.dev
├── README.md
└── server
    ├── Dockerfile.dev
    ├── index.js
    ├── models.js
    ├── package.json
    ├── package-lock.json
    └── transactions.js
```

## Usage
### Register System (Frontend)
- Enter Register Details: Enter the register ID(1, 2 or 3) and name, then click "Submit Register".

- Scan Items: Enter the item name, price, and quantity, then click "Add Item". Repeat for all items.

- Process Transaction: Click "Process Transaction" to transmit data to the central server and print the receipt.

### Central Server (Backend)
- Receives transaction data from registers.

- Stores transaction details in MongoDB.

- Generates end-of-day reports on request.

## Contributors
Umer Mahmood

Feel free to contribute to this project by submitting issues or pull requests.

## 'docker-compose.yml' File
Ensure that the Dockerfiles for the API, client, and Nginx are correctly set up in their respective directories.