// Mock database of disaster types and their default resources
const disasters = {
  flood: {
    id: 'flood',
    name: 'Flood',
    icon: '💧',
    description: 'Flooding disaster requiring water-resistant supplies and evacuation equipment',
    resources: [
      { id: 1, name: 'Water Purification Tablets', value: 500, weight: 2 },
      { id: 2, name: 'Emergency Boats', value: 1201, weight: 50 },
      { id: 3, name: 'Waterproof Tents', value: 800, weight: 15 }
    ]
  },
  earthquake: {
    id: 'earthquake',
    name: 'Earthquake',
    icon: '🏚️',
    description: 'Seismic disaster requiring medical supplies and rescue equipment',
    resources: [
      { id: 1, name: 'Medical Kits', value: 1000, weight: 10 },
      { id: 2, name: 'Search & Rescue Equipment', value: 1500, weight: 30 },
      { id: 3, name: 'Emergency Shelter', value: 900, weight: 20 }
    ]
  },
  wildfire: {
    id: 'wildfire',
    name: 'Wildfire',
    icon: '🔥',
    description: 'Fire disaster requiring firefighting equipment and evacuation resources',
    resources: [
      { id: 1, name: 'Fire Extinguishers', value: 600, weight: 12 },
      { id: 2, name: 'Breathing Masks', value: 400, weight: 3 },
      { id: 3, name: 'Evacuation Vehicles', value: 2000, weight: 100 }
    ]
  },
  hurricane: {
    id: 'hurricane',
    name: 'Hurricane',
    icon: '🌪️',
    description: 'Storm disaster requiring emergency power and communication equipment',
    resources: [
      { id: 1, name: 'Emergency Generators', value: 1800, weight: 80 },
      { id: 2, name: 'Food & Water Supplies', value: 700, weight: 25 },
      { id: 3, name: 'Communication Devices', value: 500, weight: 5 }
    ]
  },
  landslide: {
    id: 'landslide',
    name: 'Landslide',
    icon: '⛰️',
    description: 'Landslide disaster requiring excavation and medical equipment',
    resources: [
      { id: 1, name: 'Excavation Equipment', value: 2500, weight: 120 },
      { id: 2, name: 'First Aid Supplies', value: 600, weight: 8 },
      { id: 3, name: 'Emergency Blankets', value: 300, weight: 4 }
    ]
  }
};

/**
 * Get all disaster types
 */
exports.getAllDisasters = (req, res) => {
  try {
    const disasterList = Object.values(disasters).map(d => ({
      id: d.id,
      name: d.name,
      icon: d.icon,
      description: d.description,
      resourceCount: d.resources.length
    }));

    res.json({
      success: true,
      data: disasterList,
      count: disasterList.length
    });
  } catch (error) {
    console.error('Error in getAllDisasters:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};

/**
 * Get disaster by ID
 */
exports.getDisasterById = (req, res) => {
  try {
    const { id } = req.params;
    const disaster = disasters[id];

    if (!disaster) {
      return res.status(404).json({ 
        error: 'Disaster type not found',
        availableTypes: Object.keys(disasters)
      });
    }

    res.json({
      success: true,
      data: disaster
    });
  } catch (error) {
    console.error('Error in getDisasterById:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
