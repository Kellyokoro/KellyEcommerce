const express = require('express')
const {registerUser, loginUser, getUserProfile} = require('../controller/usercontroller')
const { protect } = require('../middleware/authmiddleware')
const router = express.Router()

// Import our controller function

router.post('/login', loginUser)
// When a POST request hits '/register', run the registerUser function
router.post('/register',registerUser)
router.get('/profile', protect, getUserProfile)


module.exports = router








