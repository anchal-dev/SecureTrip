// backend/routes/safeZones.js
const express = require('express');
const router = express.Router();
const SafeZone = require('../models/SafeZone');
const { auth, authorityOnly } = require('../middleware/auth');

// Get all safe zones
router.get('/', auth, async (req, res) => {
  try {
    const safeZones = await SafeZone.find({ isActive: true });
    res.json({ safeZones });
  } catch (error) {
    console.error('Error fetching safe zones:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get safe zones near a location
router.get('/nearby', auth, async (req, res) => {
  try {
    const { longitude, latitude, radius = 5000 } = req.query;
    
    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Location coordinates required' });
    }

    const safeZones = await SafeZone.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      },
      isActive: true
    });

    res.json({ safeZones });
  } catch (error) {
    console.error('Error fetching nearby safe zones:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if location is inside any safe zone
router.post('/check', auth, async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    
    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Location coordinates required' });
    }

    const safeZones = await SafeZone.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 0
        }
      },
      isActive: true
    });

    const insideSafeZones = safeZones.filter(zone => {
      const distance = calculateDistance(
        latitude, 
        longitude, 
        zone.location.coordinates[1], 
        zone.location.coordinates[0]
      );
      return distance <= zone.radius;
    });

    res.json({ 
      isInSafeZone: insideSafeZones.length > 0,
      safeZones: insideSafeZones
    });
  } catch (error) {
    console.error('Error checking safe zone:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create safe zone (Authority only)
router.post('/', authorityOnly, async (req, res) => {
  try {
    const { name, type, longitude, latitude, radius, address, phone, description, facilities } = req.body;
    
    const safeZone = new SafeZone({
      name,
      type,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      radius: radius || 500,
      address,
      phone,
      description,
      facilities,
      createdBy: req.user._id
    });

    await safeZone.save();
    res.status(201).json({ safeZone });
  } catch (error) {
    console.error('Error creating safe zone:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update safe zone (Authority only)
router.put('/:id', authorityOnly, async (req, res) => {
  try {
    const safeZone = await SafeZone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!safeZone) {
      return res.status(404).json({ message: 'Safe zone not found' });
    }
    
    res.json({ safeZone });
  } catch (error) {
    console.error('Error updating safe zone:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete safe zone (Authority only)
router.delete('/:id', authorityOnly, async (req, res) => {
  try {
    const safeZone = await SafeZone.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!safeZone) {
      return res.status(404).json({ message: 'Safe zone not found' });
    }
    
    res.json({ message: 'Safe zone deleted successfully' });
  } catch (error) {
    console.error('Error deleting safe zone:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

module.exports = router;