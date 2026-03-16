const jwt = require('jsonwebtoken')
const User = require('../Models/usermodel')

const protect = async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{

            token = req.headers.authorization.split(' ')[1]
            console.log("THE TOKEN RECEIVED IS:", token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')


            next()
        } catch (error) {
            console.log(error) 
            res.status(401).json({message: 'Not Authorized, Token Failed'})
        }
    }

    if(!token) {
        res.status(401).json({message: 'Not authorized, no token'})
    }
}

// Admin Middleware: Checks if the logged-in user has admin privileges
const admin = (req, res, next) => {
// Because the 'protect' bouncer runs first, req.user already exists!
if (req.user && req.user.isAdmin) {
    next()
  
} else {
    res.status(401).json({message: 'Not authorized as an admin'})
}
}

module.exports = { protect, admin }
