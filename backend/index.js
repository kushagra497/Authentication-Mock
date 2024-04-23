const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const { logRequest } = require('./middleware/loggerMiddleware');
const { authenticateToken } = require('./middleware/authMiddleware');


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// app.use('/user', userRoutes);


// Use logger middleware for logging requests
app.use(logRequest);

// Use auth middleware to authenticate requests
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route' });
});

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
