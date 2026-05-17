import express from 'express';

const router = express.Router();

// Mock user data (in-memory)
const users = [];

/**
 * @route   POST /api/users/register
 * @desc    Register a new user (mock)
 * @access  Public
 */
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Simple check for existing user
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  // Store user (password stored in plain text for mock purposes only)
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully.', user: { id: newUser.id, username: newUser.username } });
});

/**
 * @route   POST /api/users/login
 * @desc    Mock login
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // In a real app you'd issue a JWT or session token.
  res.json({ message: 'Login successful.', user: { id: user.id, username: user.username } });
});

export default router;
