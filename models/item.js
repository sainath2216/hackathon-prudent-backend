const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    dscription: { type: String, required: true },
    itemType: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemType', required: true }, 
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Item', itemSchema);
