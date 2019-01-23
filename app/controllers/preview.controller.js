const Preview = require('../models/preview.model.js');

// Create and Save a new Preview
exports.create = (req, res) => {

    console.log('im here...'+JSON.stringify(req.body.preview))

    // Validate request
    if(!req.body.preview) {
        return res.status(400).send({
            message: "Body can not be empty"
        });
    }

    // Create Preview
    const preview = new Preview({
        body: req.body.preview
    });

    // Save Preview in the database
    preview.save()
    .then(preview => {
        res.send(preview);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Preview."
        });
    });
};

// Retrieve and return all previews from the database.
exports.findAll = (req, res) => {
    Preview.find()
    .then(previews => {
        res.send(previews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving previews."
        });
    });
};

// Find a single preview with a previewId
exports.findOne = (req, res) => {
    Preview.findById(req.params.previewId)
    .then(preview => {
        if(!preview) {
            return res.status(404).send({
                message: "Preview not found with id " + req.params.previewId
            });            
        }
        res.send(preview);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Preview not found with id " + req.params.previewId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving preview with id " + req.params.previewId
        });
    });
};

// Update a preview identified by the previewId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.body) {
        return res.status(400).send({
            message: "Preview body can not be empty"
        });
    }

    // Find preview and update it with the request body
    Preview.findByIdAndUpdate(req.params.previewId, {
        body: req.body.body
    }, {new: true})
    .then(preview => {
        if(!preview) {
            return res.status(404).send({
                message: "Preview not found with id " + req.params.previewId
            });
        }
        res.send(preview);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Preview not found with id " + req.params.previewId
            });                
        }
        return res.status(500).send({
            message: "Error updating preview with id " + req.params.previewId
        });
    });
};

// Delete a preview with the specified previewId in the request
exports.delete = (req, res) => {
    Preview.findByIdAndRemove(req.params.previewId)
    .then(preview => {
        if(!preview) {
            return res.status(404).send({
                message: "Preview not found with id " + req.params.previewId
            });
        }
        res.send({message: "Preview deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Preview not found with id " + req.params.previewId
            });                
        }
        return res.status(500).send({
            message: "Could not delete preview with id " + req.params.previewId
        });
    });
};