const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update Location
router.post('/location', async (req, res) => {
  try {
    const { touristId, latitude, longitude, address } = req.body;

    const user = await User.findByIdAndUpdate(
      touristId,
      {
        currentLocation: {
          latitude,
          longitude,
          address,
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    const io = req.app.get('io');
    io.to('authorities').emit('location-update', {
      touristId: user._id,
      name: user.name,
      location: user.currentLocation
    });

    res.json({ message: 'Location updated', location: user.currentLocation });
  } catch (error) {
    console.error('Location update error:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// Get All Tourists
router.get('/', async (req, res) => {
  try {
    const tourists = await User.find({ role: 'tourist' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ tourists });
  } catch (error) {
    console.error('Get tourists error:', error);
    res.status(500).json({ error: 'Failed to fetch tourists' });
  }
});

// Get Tourist by ID
router.get('/:id', async (req, res) => {
  try {
    const tourist = await User.findById(req.params.id).select('-password');
    
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    res.json({ tourist });
  } catch (error) {
    console.error('Get tourist error:', error);
    res.status(500).json({ error: 'Failed to fetch tourist' });
  }
});

// Update Tourist Profile
router.put('/:id', async (req, res) => {
  try {
    const { name, phone, emergencyContact } = req.body;
    
    const tourist = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, emergencyContact },
      { new: true }
    ).select('-password');

    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    res.json({ message: 'Profile updated', tourist });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;