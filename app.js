const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/live_location_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Location schema and model
const locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);

// POST route to save location data to MongoDB
app.post('/api/location', async (req, res) => {
  const { lat, lng } = req.body;
  
  try {
    const newLocation = new Location({ lat, lng });
    await newLocation.save();
    res.status(200).json({ message: 'Location saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save location' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
