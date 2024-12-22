const mongoose = require('mongoose');
const ItemType = require('../models/itemType');
const Item = require('../models/item');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('itemType'); 
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id).populate('itemType'); 
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Add a new item
exports.addItem = async (req, res) => {
    try {
        const { itemName, dscription, itemType, quantity, price } = req.body;

        // Validate payload
        if (!itemName || !dscription || !itemType || quantity == null || price == null) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Ensure itemType is an ObjectId
        if (!mongoose.Types.ObjectId.isValid(itemType)) {
            return res.status(400).json({ error: 'Invalid itemType provided' });
        }

        // Check if itemType exists
        const itemTypeDocument = await ItemType.findById(itemType);
        if (!itemTypeDocument) {
            return res.status(400).json({ error: 'Invalid itemType provided' });
        }

        // Create and save the item
        const newItem = new Item({
            itemName,
            dscription,
            itemType: itemTypeDocument._id,
            quantity,
            price,
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error("Error saving item:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// Update an existing item
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
