const Block = require('../models/block.model.js');

// Create and Save a new Block
exports.create = (req, res) => {

    // Validate request
    if(!req.body.body) {
        return res.status(400).send({
            message: "Block body can not be empty"
        });
    }

    // Create a Block
    const block = new Block({
    	title: req.body.title || "Untitled Block",
    	description: req.body.description,
        preview: req.body.preview,
        category: req.body.category,
        body: req.body.body
    });

    // Save Block in the database
    block.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Block."
        });
    });
};

// Retrieve and return all blocks from the database.
exports.findAll = (req, res) => {
    Block.find()
    .then(blocks => {
        res.send(blocks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving blocks."
        });
    });
};

// Find a single block with a blockId
exports.findOne = (req, res) => {
    Block.findById(req.params.blockId)
    .then(block => {
        if(!block) {
            return res.status(404).send({
                message: "Block not found with id " + req.params.blockId
            });            
        }
        res.send(block);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Block not found with id " + req.params.blockId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving block with id " + req.params.blockId
        });
    });
};

// Update a block identified by the blockId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.body) {
        return res.status(400).send({
            message: "Block body can not be empty"
        });
    }

    // Find block and update it with the request body
    Block.findByIdAndUpdate(req.params.blockId, {
        title: req.body.title || "Untitled Block",
    	description: req.body.description,
        preview: req.body.preview,
        category: req.body.category,
        body: req.body.body
    }, {new: true})
    .then(block => {
        if(!block) {
            return res.status(404).send({
                message: "Block not found with id " + req.params.blockId
            });
        }
        res.send(block);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Block not found with id " + req.params.blockId
            });                
        }
        return res.status(500).send({
            message: "Error updating block with id " + req.params.blockId
        });
    });
};

// Delete a block with the specified blockId in the request
exports.delete = (req, res) => {
    Block.findByIdAndRemove(req.params.blockId)
    .then(block => {
        if(!block) {
            return res.status(404).send({
                message: "Block not found with id " + req.params.blockId
            });
        }
        res.send({message: "Block deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Block not found with id " + req.params.blockId
            });                
        }
        return res.status(500).send({
            message: "Could not delete block with id " + req.params.blockId
        });
    });
};