const path = require('path')
const express = require('express')
const multer = require('multer')
const router = express.Router()

// 1. Storage Engine: Tells Multer WHERE to put the file and WHAT to name it
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/') // Save files into the 'uploads' folder we just made
    },
    filename(req, file, cb) {
        // Create a unique file name: fieldname-timestamp.extension (e.g., image-167948392.jpg)
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// 2. File Filter: Security check to make sure they only upload images, not malicious scripts
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/ // Allowed extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!') // Reject non-image files
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
});

// 4. The actual POST route for uploading
// 'upload.single('image')' means we are expecting ONE file, attached to a field named 'image'
router.post('/', upload.single('image'), (req, res) => {
    // Once Multer saves the file, we send the file's new path back to the frontend/Postman
    res.send(`/${req.file.path}`)
});

module.exports = router