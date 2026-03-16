const Order = require('../Models/orderModel')
const sendEmail = require('../utils/sendEmail')
const addOrderItems = async(req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body
// 2. Security Check: Make sure the cart isn't actually empty
        if (orderItems && orderItems.length === 0) {
            res.status(400).json({message: 'No order items in the cart'})
            return
        }
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)

    } catch (error) {
        res.status(500).json({ message: error.message})
        
    }
}

const getOrderById = async (req, res) => {
    try {
        // .populate() grabs the Name and Email from the User collection
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        )
        if (order) {
            res.json(order)
        } else {
            res.status(404).json({ message: 'Order not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        res.json(orders)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Flip the boolean to true
            order.isPaid = true;
            // Record the exact date and time
            order.paidAt = Date.now();
            
            // This is where we store the receipt data from the payment gateway (mocked for now)
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save()

            try {
                const message = `Hello ${req.user.name},\n\nYour payment for Order #${order._id} was successful!
                 \nTotal paid: $${order.totalPrice}\n\nThank you for shopping with us!`;

                await sendEmail({
                    email: req.user.email,
                    subject: 'Payment Successful - Order Receipt',
                    message: message,
                });
            } catch (emailError) {
                console.error('Email could not be sent:', emailError);
            }

            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name')
        res.json(orders)
    } catch (error) {
        res.json(500).json({message: error.message})
    }
}

const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Flip the boolean to true and log the date
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




module.exports = { addOrderItems, getOrderById,
     getMyOrders, updateOrderToPaid, updateOrderToDelivered, getOrders }


