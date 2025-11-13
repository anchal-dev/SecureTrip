const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const User = require('../models/User');

// Get ALL Alerts (for Authority Dashboard) - ADD THIS FIRST
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate('touristId', 'name phone email emergencyContact profilePhoto')
      .sort({ createdAt: -1 })
      .limit(100);

    console.log(`📊 Found ${alerts.length} total alerts`);
    res.json({ alerts });
  } catch (error) {
    console.error('Get all alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

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
    if (io) {
      io.to('authorities').emit('new-alert', {
        alert: alert.toObject(),
        touristName: tourist.name,
        touristPhone: tourist.phone,
        emergencyContact: tourist.emergencyContact
      });
    }

    res.status(201).json({
      message: 'SOS alert sent successfully',
      alert
    });
  } catch (error) {
    console.error('SOS Alert error:', error);
    res.status(500).json({ error: 'Failed to send alert' });
  }
});

// Get All Active Alerts (Gets all alerts that are not resolved)
router.get('/active', async (req, res) => {
  try {
    // Get ALL alerts that are not resolved (including active, acknowledged, etc.)
    const alerts = await Alert.find({ 
      status: { $ne: 'resolved' }  // Get everything EXCEPT resolved
    })
      .populate('touristId', 'name phone email emergencyContact profilePhoto')
      .sort({ createdAt: -1 })
      .limit(100);

    console.log(`📊 Found ${alerts.length} active alerts`);
    res.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Get Alert Statistics
router.get('/stats', async (req, res) => {
  try {
    const totalAlerts = await Alert.countDocuments();
    const activeAlerts = await Alert.countDocuments({ 
      status: { $in: ['active', 'acknowledged'] } 
    });
    const resolvedAlerts = await Alert.countDocuments({ status: 'resolved' });

    console.log(`📊 Stats - Total: ${totalAlerts}, Active: ${activeAlerts}, Resolved: ${resolvedAlerts}`);

    // Alerts by severity
    const alertsBySeverity = await Alert.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    // Alerts by type
    const alertsByType = await Alert.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Alerts over time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const alertsOverTime = await Alert.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      totalAlerts,
      activeAlerts,
      resolvedAlerts,
      alertsBySeverity: alertsBySeverity.map(item => ({
        name: item._id,
        value: item.count
      })),
      alertsByType: alertsByType.map(item => ({
        type: item._id,
        count: item.count
      })),
      alertsOverTime: alertsOverTime.map(item => ({
        date: item._id,
        alerts: item.count
      }))
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get Alerts by Tourist ID
router.get('/tourist/:touristId', async (req, res) => {
  try {
    const { touristId } = req.params;
    
    const alerts = await Alert.find({ touristId })
      .sort({ createdAt: -1 })
      .limit(50);

    console.log(`📊 Found ${alerts.length} alerts for tourist ${touristId}`);
    res.json({ alerts });
  } catch (error) {
    console.error('Get tourist alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Update Alert Status (PATCH)
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
    if (io) {
      io.to('authorities').emit('alert-updated', alert);
    }

    console.log(`✅ Alert ${alertId} updated to status: ${status}`);
    res.json({ message: 'Alert updated', alert });
  } catch (error) {
    console.error('Update alert error:', error);
    res.status(500).json({ error: 'Failed to update alert' });
  }
});

// Update Alert Status (PUT)
router.put('/:alertId', async (req, res) => {
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
    if (io) {
      io.to('authorities').emit('alert-updated', alert);
    }

    console.log(`✅ Alert ${alertId} updated to status: ${status}`);
    res.json({ message: 'Alert updated', alert });
  } catch (error) {
    console.error('Update alert error:', error);
    res.status(500).json({ error: 'Failed to update alert' });
  }
});

module.exports = router;