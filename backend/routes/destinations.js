const express = require('express');
const router = express.Router();

// Mock database for Week 2
const destinations = [
  { id: 'dest_0', name: 'Munnar', state: 'Kerala', type: 'Nature', budgetTier: 'mid', foundBy: 'Travique AI' },
  { id: 'dest_1', name: 'Udaipur', state: 'Rajasthan', type: 'Heritage', budgetTier: 'luxury', foundBy: 'Travique AI' },
  { id: 'dest_2', name: 'Goa', state: 'Goa', type: 'Beaches', budgetTier: 'mid', foundBy: 'Travique AI' }
];

// GET: Fetch all destinations
router.get('/', (req, res) => {
  res.json(destinations);
});

// GET: Fetch a single destination by ID
router.get('/:id', (req, res) => {
  const foundDestination = destinations.find(dest => dest.id === req.params.id);
  
  if (!foundDestination) {
    return res.status(404).json({ message: "Destination not found" });
  }
  
  res.json(foundDestination);
});

// POST: Add a newly curated gem
router.post('/', (req, res) => {
  const { name, state, type, budgetTier, image, desc, foundBy } = req.body;
  
  // Basic validation
  if (!name || !state) {
    return res.status(400).json({ message: "Name and state are required." });
  }

  const newDestination = {
    id: `dest_custom_${Date.now()}`,
    name,
    state,
    type: type || "Community",
    budgetTier: budgetTier || "mid",
    image: image || "",
    desc: desc || "A newly curated gem.",
    foundBy: foundBy || "@explorer"
  };
  
  destinations.unshift(newDestination); // Add to beginning of array
  res.status(201).json(newDestination); // 201 Created
});

// DELETE: Remove a destination
router.delete('/:id', (req, res) => {
  const index = destinations.findIndex(dest => dest.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: "Destination not found." });
  }
  
  destinations.splice(index, 1);
  res.json({ message: "Destination successfully removed." });
});

module.exports = router;