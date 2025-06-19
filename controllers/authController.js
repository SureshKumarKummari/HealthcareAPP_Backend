const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

exports.register = async (req, res) => {
const { name, email, password } = req.body;
if (!name || !email || !password) return errorHandler(res, 400, 'All fields are required');
try {
let user = await User.findOne({ email });
if (user) return errorHandler(res, 400, 'User already exists');
const hashedPassword = await bcrypt.hash(password, 10);
user = new User({ name, email, password: hashedPassword });
await user.save();
res.status(201).json({ "message":"User created successfully" });
} catch (err) {
  errorHandler(res, 500, 'Server error');
}
};

exports.login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return errorHandler(res, 400, 'Email and password required');
try {
const user = await User.findOne({ email });
if (!user) return errorHandler(res, 400, 'Invalid credentials');
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return errorHandler(res, 400, 'Invalid credentials');
const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '10h' });
res.json({ token });
} catch (err) {
errorHandler(res, 500, 'Server error');
}
};