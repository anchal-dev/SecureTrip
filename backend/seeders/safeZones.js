// backend/seeders/safeZones.js
const mongoose = require('mongoose');
const SafeZone = require('../models/SafeZone');

const sampleSafeZones = [
  {
    name: 'Hazratganj Police Station',
    type: 'police_station',
    location: {
      type: 'Point',
      coordinates: [80.9462, 26.8547]
    },
    radius: 500,
    address: 'Hazratganj, Lucknow, Uttar Pradesh',
    phone: '100',
    description: 'Main police station in central Lucknow',
    facilities: ['24/7', 'police', 'emergency_response']
  },
  {
    name: 'King George Medical University',
    type: 'hospital',
    location: {
      type: 'Point',
      coordinates: [80.9534, 26.8521]
    },
    radius: 1000,
    address: 'Shah Mina Road, Lucknow',
    phone: '108',
    description: 'Major government hospital with emergency services',
    facilities: ['24/7', 'medical', 'emergency', 'ambulance']
  },
  {
    name: 'Tourist Information Center',
    type: 'tourist_center',
    location: {
      type: 'Point',
      coordinates: [80.9555, 26.8467]
    },
    radius: 300,
    address: 'Near Bara Imambara, Lucknow',
    phone: '1363',
    description: 'Tourist help center with multilingual support',
    facilities: ['tourist_info', 'guides', 'emergency_help']
  }
];

async function seedSafeZones() {
  try {
    await mongoose.connect('mongodb://localhost:27017/tourist-safety');
    console.log('📦 Connected to MongoDB');
    
    await SafeZone.deleteMany({});
    console.log('🗑️  Cleared existing safe zones');
    
    await SafeZone.insertMany(sampleSafeZones);
    console.log('✅ Safe zones seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding safe zones:', error);
    process.exit(1);
  }
}

seedSafeZones();