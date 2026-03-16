const User = require('../Models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


const registerUser = async (req,res) => {
    try{
        const { name, email, password} = req.body
// 2. Check if a user with this email already exists in the database
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists'})
        }

 //Generate a "salt" (random characters to make the hash even more secure
const salt = await bcrypt.genSalt(10)

//  Hash the password using the salt
const hashedPassword = await bcrypt.hash(password, salt)



const user = await User.create({
    name,
    email,
    password: hashedPassword

})

if (user) {
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: 'user registered successfully'
    })
} else {
    res.status(400).json({message: 'Invalid user data received'})
}

    } catch (error) {
    res.status(500).json({message: error.message})
}


}
// @desc    Authenticate a user & get token (Login)
// @route   POST /api/users/login

const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body
        // 1. Check if the user exists in the database
        const user = await User.findOne({email})
// 2. Compare the entered password with the hashed password in the database
// We use bcrypt.compare() which safely compares the plain text to the hash
if (user && (await bcrypt.compare(password, user.password))) {
// 3. If they match, send back the user data AND the new JWT token
res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)

})
} else{
    res.status(401).json({message:'Invalid email or password'})
}
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if (user) {
            res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404).json({ message: 'user not found'})
    }
} catch (error) {
    res.status(500).json({message: error.message})
}

}


module.exports = { registerUser, loginUser, getUserProfile }

