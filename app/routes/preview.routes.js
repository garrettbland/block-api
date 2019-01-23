module.exports = (app) => {
    const previews = require('../controllers/preview.controller.js');

    // Create a new preview
    app.post('/api/v1/previews', previews.create);

    // Retrieve all previews
    app.get('/api/v1/previews', previews.findAll);

    // Retrieve a single preview with previewId
    app.get('/api/v1/previews/:previewId', previews.findOne);

    // Update a preview with previewId
    app.put('/api/v1/previews/:previewId', previews.update);

    // Delete a preview with previewId
    app.delete('/api/v1/previews/:previewId', previews.delete);
}