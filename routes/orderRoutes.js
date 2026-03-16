const express = require('express')
const router = express.Router()
const { addOrderItems, getOrderById,
     getMyOrders, updateOrderToPaid, 
     updateOrderToDelivered, getOrders } = require('../controller/orderController')
const { protect, admin } = require('../middleware/authmiddleware')


router.post('/', protect, addOrderItems)
router.get('/', protect, admin, getOrders)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)

module.exports = router


