// Model imports.
const { Thought, User } = require('../models');

// Exporting query functions.
module.exports = {
    
    // Query to get all thoughts.
    async getAllThoughts (req, res) {
        try {
            const thoughtData = await Thought.find();

        res.json(thoughtData);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Query to get single thought by ID.
    async getSingleThought (req, res) {
        try {
            const thoughtData = await Thought.findOne({
                _id: req.params.thoughtId
            });

            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!'});
            };

        res.json(thoughtData);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Query to create thought.
    async createThought (req, res) {
        try {
            const thoughtData = await Thought.create(req.body);

            const userData = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: thoughtData._id }},
                { runValidators: true, new: true }
            );

        res.json({ thoughtData, userData });
        
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Query to find thought by ID, and update it.
    async updateThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
            };

        res.json(thoughtData);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Query to find thought by ID, and delete it.
    async deleteThought(req, res) {
        try {
          const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this ID!' });
          };

        res.json(thoughtData);

        } catch (err) {
          res.status(500).json(err);
        }
    },

    // Query to find thought by ID, and add reaction to it.
    async addReaction (req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true },
            );

            if(!reactionData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
            };

        res.json(reactionData);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Query to find thought by ID, reaction by reactionID, and delete it.
    async deleteReaction (req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { runValidators: true, new: true }
            );

            if(!reactionData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
            };

        res.json(reactionData);

        } catch (err) {
            res.status(500).json(err);
        }
    },
};