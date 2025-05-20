const express = require('express'); // imports express
const router = express.Router(); // creates an instance of express router, used to organize route handlers
const authController = require('../controllers/authController'); // imports authController with registerUser function

router.post('/register', authController.registerUser)

module.exports = router;