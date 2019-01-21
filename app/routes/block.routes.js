module.exports = (app) => {
    const blocks = require('../controllers/block.controller.js');

    // Create a new block
    app.post('/api/v1/blocks', blocks.create);

    // Retrieve all blocks
    app.get('/api/v1/blocks', blocks.findAll);

    // Retrieve a single block with blockId
    app.get('/api/v1/blocks/:blockId', blocks.findOne);

    // Update a block with blockId
    app.put('/api/v1/blocks/:blockId', blocks.update);

    // Delete a block with blockId
    app.delete('/api/v1/blocks/:blockId', blocks.delete);
}