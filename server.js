const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the DB connection
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productroutes')
const orderRoutes = require('./routes/orderRoutes')
const path = require('path')
const uploadRoutes = require('./routes/uploadRoutes')

// Load environment variables from the .env file
dotenv.config()

// Connect to the database
connectDB()

const server = express()

// Middleware to parse incoming JSON data (we'll need this for Postman later)
server.use(express.json())
server.use('/api/users', userRoutes)
server.use('/api/products', productRoutes)
server.use('/api/orders', orderRoutes)
server.use('/api/upload', uploadRoutes)
server.use('/uploads', express.static(path.join(__dirname, '/uploads')));

server.get('/', (req, res) => {
    res.send('E-commerce API is running...')
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})