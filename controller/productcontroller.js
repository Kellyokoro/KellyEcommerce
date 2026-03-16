const Product = require('../Models/productmodel')

const createProduct = async (req, res) => {
    try{
        const {name, price, description, category, countInStock, brand} = req.body
        const product = new Product({
            name,
            price,
            description,
            category,
            countInStock,
            brand,
            user: req.user._id
        })
const createdProduct = await product.save()
res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const getProducts = async (req, res) => {
    try{
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: 'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, brand, countInStock} = req.body
        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name || product.name
            product.price = price || product.price
            product.description = description || product.description
            product.category = category || product.category
            product.brand = brand || product.brand
            product.countInStock = countInStock || product.countInStock

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({message: 'Product not found'})

        }
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)

        if(product) {
            await product.deleteOne()
            res.json({message: 'Product removed successfully'})
        } else {
            res.status(404).json({message: 'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct }


