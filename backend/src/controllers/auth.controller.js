const User = require('../models/user.model');
const BlacklistToken = require('../models/blacklistToken.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Basic input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // 2. Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use.' });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // 5. Send success response
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Internal server error during registration.' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Basic input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 3. Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 4. Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });

        // 5. Send token in an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error during login.' });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'No token provided.' });
        }

        // 1. Add the token to the blacklist
        await BlacklistToken.create({ token });

        // 2. Clear the cookie
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ message: 'Internal server error during logout.' });
    }
};


const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}


module.exports = { register, login, logout, profile };
