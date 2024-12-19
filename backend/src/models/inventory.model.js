const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);