const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
  try {
    // Get user details from token (assuming token is passed in headers)
    const userId = req.user.userId;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.editProfile = async (req, res) => {
  try {
    // Get user details from token (assuming token is passed in headers)
    const userId = req.user.userId;
    // Update user details
    await User.findByIdAndUpdate(userId, req.body);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
