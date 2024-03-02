const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

module.exports = {

    async getAllUsers (req, res) {
        try {
            const userData = await User.find()
            .select('-__v')
            .populate('thoughts');
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser (req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts');

            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
            } else {
                res.json(userData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser (req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser (req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userID },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
            } else {
                res.json(userData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser (req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId });

            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID!' });
            } else {
                res.json(userData);
            };
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend (req, res) {
        try {
            const friendData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friendData) {
                res.status(404).json({ message: 'No user found with this ID!'});
            } else {
                res.json(friendData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend (req, res) {
        try {
            const friendData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );

            if (!friendData) {
                res.status(404).json({ message: 'No user found with this ID!'});
            } else {
                res.json(friendData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};