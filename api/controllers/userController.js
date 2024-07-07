const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, dob, email, password, city, state, country, postal_code } = req.body;

    try {
        // Generate a unique username based on name
        let username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(1000 + Math.random() * 9000);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        let user = new User({
            name,
            dob,
            email,
            password: hashedPassword, // Store hashed password
            username,
            city,
            state,
            country,
            postal_code
        });

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare entered password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, 'karthik', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    register,
    login,
    getUsers
};