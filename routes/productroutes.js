const express = require('express')
const router = express.Router()
const { createProduct, getProducts, getProductById,
     updateProduct, deleteProduct } = require('../controller/productcontroller')
const { protect, admin} = require('../middleware/authmiddleware')


router.get('/', getProducts)
router.get('/', getProductById)

router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)


module.exports = router


