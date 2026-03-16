const mongoose = require ('mongoose')

const productschema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId},
        name: { type: String, required: true},
        brand: { type: String, required: true},
        category: { type: String, required: true }, // We will upgrade this to link to a Category model in Week 12
        description: { type: String, required: true},
        price : { type: Number, required: true, default: 0},
        countInStock: {type: Number, required: true, default: 0 },
        imageURL: {type: String, required: false} // Set to false so we can add images later

    },
    {
        timestamp: true
    }
)

const Product = mongoose.model('Product', productschema)
module.exports = Product
