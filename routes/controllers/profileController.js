const Profile = require('../models/profile');

exports.saveProfile = async (req, res, next) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json({ success: true, message: 'Profile saved to MongoDB' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error saving profile to MongoDB' });
    }
};