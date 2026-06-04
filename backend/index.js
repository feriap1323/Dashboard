const express = require('express');
const cors    = require('cors');
const path    = require('path');
const bcrypt  = require('bcryptjs');

// DB config & model
require('./db/config');
const User = require('./db/user');

const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(cors());

// Serve static HTML files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ──────────────────────────────────────────────

// ── Page Routes ─────────────────────────────────────────
app.get('/',           (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/home',       (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/about',      (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, 'public', 'gallery.html')));
app.get('/login',      (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register',   (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/api-tester', (req, res) => res.sendFile(path.join(__dirname, 'public', 'apitester.html')));
/**
 * POST /signup
 * Body: { name, email, password }
 * Creates a new user in MongoDB (password hashed with bcrypt)
 */
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required.' });
    }

    // FIX: Hash password before saving (was stored as plain text before)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('✅ User saved:', user.email);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /login
 * Body: { email, password }
 * FIX: This route was completely missing — added login support
 */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    console.log('✅ User logged in:', user.email);
    res.json({ message: 'Login successful.', user: { _id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /users
 * Returns all users (password excluded)
 */
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * GET /users/:id
 */
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * PUT /users/:id
 */
app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * DELETE /users/:id
 */
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted.', id: req.params.id });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ── 404 handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found.` });
});

// ── Global error handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong.' });
});

// ── Start ────────────────────────────────────────────────
app.listen(5000, () => {
  console.log('✅ API server running on http://localhost:5000');
});