const express = require('express'); // imports express
const router = express.Router(); // creates an instance of express router, used to organize route handlers
const authController = require('../controllers/authController'); // imports authController with registerUser function

// route for user registration
router.post('/register', authController.registerUser)

// route for user login
router.post('/login', authController.loginUser);

module.exports = router;