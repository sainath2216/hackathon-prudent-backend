const express = require('express');
const router = express.Router();
const itemTypeController = require('../controllers/itemTypeController');

// Get all item types
router.get('/', itemTypeController.getAllItemTypes);

// Add a new item type
router.post('/', itemTypeController.addItemType);

router.put('/:id', itemTypeController.updateItemType);

// Delete an item type by ID
router.delete('/:id', itemTypeController.deleteItemType);

module.exports = router;
