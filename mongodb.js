const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://0.0.0.0:27017/live_location_db';

// Connect to MongoDB
mongoose.connect(mongoURI, {             
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define schema for live location data
const liveLocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create model based on the schema
const LiveLocation = mongoose.model('LiveLocation', liveLocationSchema);

// Example usage of the LiveLocation model to save live location data

const newLiveLocation = new LiveLocation({
  latitude: 40.7128,
  longitude: -74.0060,
});
newLiveLocation.save()
  .then(() => {
    console.log('Live location data saved successfully');
  })
  .catch((error) => {
    console.error('Failed to save live location data:', error);
  });
module.exports = LiveLocation;
