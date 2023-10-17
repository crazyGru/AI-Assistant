const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://michaelberckart:P3qdJJn14DiZtro8@michael.nm1pxsl.mongodb.net.mongodb.net/my_db?retryWrites=true&w=majority');

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const DocumentModel = mongoose.model('Document', DocumentSchema);

router.post('/save', async (req, res) => {
    try {
        const { name, content } = req.body;
        const existingDocument = await DocumentModel.findOne({ name }); // Check if document with the same name exists

        if (existingDocument) {
            const filter = { name: name };
            const update = { content: content };
            let updatedDocument = await DocumentModel.findOneAndUpdate(filter, update, {
                new: true, // Return the updated document
                upsert: true // Create the document if it does not exist
            });
            return res.send({ message: 'Document updated successfully' }); // Return error message if document exists
        }

        const newDocument = new DocumentModel({ name, content });
        await newDocument.save();
        res.send({ message: 'Document saved successfully' });
    } catch (err) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.post('/get_all', async (req, res) => {
    try {
        const documents = await DocumentModel.find().sort({createdAt:-1});
        res.json(documents);
    } catch (err) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.post('/update', async (req, res) => {
    try {
        const { name, content, createdAt } = req.body;
        const filter = { name: name };
        const update = { content: content };
        let updatedDocument = await DocumentModel.findOneAndUpdate(filter, update, {
            new: true, // Return the updated document
            upsert: true // Create the document if it does not exist
        });
        res.send({ message: 'Document updated successfully' });
    } catch (err) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await DocumentModel.findByIdAndRemove(id);
        res.send({ message: 'Document deleted successfully' });
    } catch (err) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

module.exports = router;