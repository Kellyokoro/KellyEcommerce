const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},

},

{
    // This automatically adds 'createdAt' and 'updatedAt' timestamps to every user
        timestamps: true
},
)
module.exports = mongoose.model('User', userSchema)


