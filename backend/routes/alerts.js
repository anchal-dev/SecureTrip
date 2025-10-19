const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const User = require('../models/User');

// Create SOS Alert
router.post('/sos', async (req, res) => {
  try {
    const { touristId, location, message } = req.body;

    const tourist = await User.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    const alert = new Alert({
      touristId,
      type: 'SOS',
      severity: 'critical',
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address || 'Unknown'
      },
      message: message || 'Emergency SOS Alert',
      status: 'active'
    });

    await alert.save();
    await alert.populate('touristId', 'name phone email emergencyContact');

    const io = req.app.get('io');
    io.to('authorities').emit('new-alert', {
      alert: alert.toObject(),
      touristName: tourist.name,
      touristPhone: tourist.phone,
      emergencyContact: tourist.emergencyContact
    });

    res.status(201).json({
      message: 'SOS alert sent successfully',
      alert
    });
  } catch (error) {
    console.error('SOS Alert error:', error);
    res.status(500).json({ error: 'Failed to send alert' });
  }
});

// Get All Active Alerts
router.get('/active', async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'active' })
      .populate('touristId', 'name phone email emergencyContact profilePhoto')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Get Alerts by Tourist ID
router.get('/tourist/:touristId', async (req, res) => {
  try {
    const { touristId } = req.params;
    
    const alerts = await Alert.find({ touristId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ alerts });
  } catch (error) {
    console.error('Get tourist alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Update Alert Status
router.patch('/:alertId', async (req, res) => {
  try {
    const { alertId } = req.params;
    const { status, responderId, notes } = req.body;

    const updateData = { status };
    
    if (status === 'acknowledged' && responderId) {
      updateData.responderId = responderId;
      updateData.responseTime = new Date();
    }
    
    if (status === 'resolved') {
      updateData.resolvedAt = new Date();
    }
    
    if (notes) {
      updateData.notes = notes;
    }

    const alert = await Alert.findByIdAndUpdate(
      alertId,
      updateData,
      { new: true }
    ).populate('touristId responderId');

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    const io = req.app.get('io');
    io.to('authorities').emit('alert-updated', alert);

    res.json({ message: 'Alert updated', alert });
  } catch (error) {
    console.error('Update alert error:', error);
    res.status(500).json({ error: 'Failed to update alert' });
  }
});

module.exports = router;