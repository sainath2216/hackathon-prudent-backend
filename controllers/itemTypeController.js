const ItemType = require('../models/itemType');

// Get all item types
exports.getAllItemTypes = async (req, res) => {
    try {
        const itemTypes = await ItemType.find(); // Get all item types
        res.json(itemTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new item type
exports.addItemType = async (req, res) => {
    try {
        const newItemType = new ItemType(req.body);
        await newItemType.save();
        res.status(201).json(newItemType);
    } catch (err) {
        if (err.code === 11000) {  // MongoDB duplicate key error code
            return res.status(400).json({ error: 'Item type already exists' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.updateItemType = async (req, res) => {
    try {
        const updatedItemType = await ItemType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Ensures updated data adheres to schema rules
        );

        if (!updatedItemType) {
            return res.status(404).json({ error: 'Item type not found' });
        }

        res.json(updatedItemType);
    } catch (err) {
        if (err.code === 11000) { // Handle unique constraint violations
            return res.status(400).json({ error: 'Item type already exists' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItemType = async (req, res) => {
    try {
        const deletedItemType = await ItemType.findByIdAndDelete(req.params.id);
        if (!deletedItemType) {
            return res.status(404).json({ error: 'Item type not found' });
        }
        res.json({ message: 'Item type deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};