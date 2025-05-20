const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // attempting to find an existing user with either the same username or same email registered
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // if there is an existing user, return 409 conflict status
            return res.status(409).json({ message: 'username or email has already been used'});
        }

        // using bcrypt to encrypt the password and use a hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // if a new user can be created (no existing user with that username or email), then create a new user using model 
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // awaiting the user to be saved
        await newUser.save();

        // after the user saves, return completed status
        res.status(201).json({ message: 'user registered successfully' });
    } catch (error) {
        // in case an error occurs
        console.error('error during registration: ', error);
        res.status(500).json({ message: 'registration failed', error: error.message });
    }
};

module.exports = {
    registerUser
};