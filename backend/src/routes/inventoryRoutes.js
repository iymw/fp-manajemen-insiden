const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory.model');

router.get('/inventory', async (req, res) => {
    try {
        const { limit = 10, page = 1, category, name } = req.query;
        const query = {};

        if (category) query.category = { $regex: category, $options: 'i' };
        if (name) query.name = { $regex: name, $options: 'i' };

        const inventoryItems = await Inventory.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalItems = await Inventory.countDocuments(query);

        res.status(200).json({
            code: 200,
            message: 'Successfully fetched inventory data!',
            data: inventoryItems,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.get('/inventory/:id', async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);

        if (!inventoryItem) {
            return res.status(404).json({
                message: 'Inventory item not found!',
            });
        }

        res.status(200).json({
            code: 200,
            message: 'Successfully fetched inventory item!',
            data: inventoryItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.post('/inventory', async (req, res) => {
    try {
        const { name, category, quantity, price, supplier } = req.body;

        if (!name || !category || !quantity || !price || !supplier) {
            return res.status(400).json({
                message: 'Missing required fields!',
            });
        }

        const newInventoryItem = new Inventory({
            name,
            category,
            quantity,
            price,
            supplier,
        });

        const savedItem = await newInventoryItem.save();

        res.status(201).json({
            code: 201,
            message: 'Successfully created inventory item!',
            data: savedItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.patch('/inventory/:id', async (req, res) => {
    try {
        const { name, category, quantity, price, supplier } = req.body;

        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            { name, category, quantity, price, supplier },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: 'Inventory item not found!',
            });
        }

        res.status(200).json({
            code: 200,
            message: 'Successfully updated inventory item!',
            data: updatedItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.delete('/inventory/:id', async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Inventory item not found!',
            });
        }

        res.status(200).json({
            code: 200,
            message: 'Successfully deleted inventory item!',
            data: deletedItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;
