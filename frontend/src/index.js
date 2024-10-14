// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
require('dotenv').config(); // Use dotenv for environment variables

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/LoginSignup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected Successfully!');
  })
  .catch((error) => {
    console.error('Failed to Connect to MongoDB:', error);
  });

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'partner'], required: true },
  restaurantAddress: { type: String },
  restaurantName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
});

const User = mongoose.model('LogInCollection', userSchema);

// Create Admin user (if not exists)
const createAdminUser = async () => {
  try {
    // Check if an admin user with the given email already exists
    const adminExists = await User.findOne({ email: 'admin@gmail.com', role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('adminPassword123', 10);
      await User.create({
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    // Handle duplicate key error more gracefully
    if (error.code === 11000) {
      console.error('Admin user already exists with this name or email.');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
};
createAdminUser();

// Serve static files
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/image', express.static(path.join(__dirname, '../image')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/templates', express.static(path.join(__dirname, '../templates')));
app.use('/viewpages', express.static(path.join(__dirname, '../viewpages')));

// Serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../viewpages', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'signup.html'));
});

app.get('/partnerdetails', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'partnerdetails.html'));
});

app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates', 'calendar.html'));
});

app.get('about', (req, res) => {
  res.sendFile(path.join(__dirname, '../viewpages', 'about.html'));
});




// Signup route for partners
app.post('/signup', async (req, res) => {
  const { restaurantAddress, restaurantName, email, phone, name, password } = req.body;
  if (!name || !password || !email || password.length < 7) {
    return res.send(`<script>alert('All fields are required, and password must be at least 7 characters long.'); window.location.href='/signup';</script>`);
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(`<script>alert('Email is already registered. Please try a different email.'); window.location.href='/signup';</script>`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      password: hashedPassword,
      role: 'partner',
      restaurantAddress,
      restaurantName,
      email,
      phone
    });
    await newUser.save();
    res.send(`<script>alert('Signup successful! Please log in.'); window.location.href='/login';</script>`);
  } catch (error) {
    console.error('Error creating user:', error);
    res.send(`<script>alert('Error creating user. Please try again later.'); window.location.href='/signup';</script>`);
  }
});

// Login route using email and password
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.send(`<script>alert('Invalid credentials. Email not found.'); window.location.href='/login';</script>`);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send(`<script>alert('Invalid credentials. Incorrect password.'); window.location.href='/login';</script>`);
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });

    if (user.role === 'admin') {
      res.send(`<script>localStorage.setItem('username', '${user.email}'); window.location.href='/templates/admin.html';</script>`);
    } else if (user.role === 'partner') {
      res.send(`<script>localStorage.setItem('username', '${user.email}'); window.location.href='/partnerdetails';</script>`);
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.send(`<script>alert('Error logging in. Please try again later.'); window.location.href='/login';</script>`);
  }
});

// Handle logout request
app.get('/logout', (req, res) => {
  res.send(`<script>localStorage.removeItem('username'); window.location.href='/login';</script>`);
});

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.send(`<script>alert('Access denied. Please log in to continue.'); window.location.href='/login';</script>`);
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.user = verified;
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.send(`<script>alert('Invalid token. Please log in again.'); window.location.href='/login';</script>`);
  }
};

// Partner Dashboard route
app.get('/partnerdashboard', authenticateToken, (req, res) => {
  if (req.user.role !== 'partner') {
    return res.send(`<script>alert('Access forbidden. You do not have the necessary permissions.'); window.location.href='/login';</script>`);
  }
  res.json({ message: 'Welcome to the Partner Dashboard' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:4000`);
});
