const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    //Who placed the order(links to user model)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    //What did they buy? (An array of items, linking to your Product model)
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        price:{type: Number, required: true},
        product:{type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }

    }],

    //where is it going(shipping destination)
    shippingAddress:{
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true}
    },

//how are they paying(bank transfer, card, USSD)
paymentMethod:{
    type: String,
    required: true,
},
taxPrice:{
    type: Number,
    required: true,
    default: 0.0,
},
shippingPrice:{
    type: Number,
    required: true,
    default: 0.0,
},
totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        // 6. Payment & Delivery Status
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date, // Will only be set when payment is successful
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date, // Will only be set when the admin marks it shipped
        },
    },
    {
        timestamps: true, // Automatically tracks when the order was placed
    }
    
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order

