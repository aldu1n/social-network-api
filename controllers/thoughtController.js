const { Thought, User } = require('../models');

module.exports = {
    
    async getAllThoughts (req, res) {
        try {
            const thoughtData = await Thought.find();
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought (req, res) {
        try {
            const thoughtData = await Thought.findOne({
                _id: req.params.id
            });

            if (!thoughtData) {
                return res.status(400).json({ message: 'No thought found with this ID!'});
            } else {
                res.status(200).json(thoughtData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought (req, res) {
        try {
            const thoughtData = await Thought.create(req.body);

            const userData = await User.findByIdAndUpdate(
                req.body.id,
                { $addToSet: { thoughts: thoughtData._id } },
                { runValidators: true, new: true }
            );
            res.status(200).json({ thoughtData, userData });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!thoughtData) {
                return res.status(400).json({ message: 'No thought found with this ID!' });
            } else {
                res.status(200).json(thoughtData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
          const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with this ID!' });
          } else {
            res.status(200).json(thoughtData);
          }
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    },

    async addReaction (req, res) {
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true },
            );

            if(!reactionData) {
                return res.status(400).json({ message: 'No thought found with this ID!' });
            } else {
                res.status(200).json(reaction);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try {
            const reactionData = await Thought.findOneAndDelete({ reactionId: req.params.reactionId });
            if(!reactionData) {
                return res.status(400).json({ message: 'No thought found with this ID!' });
            } else {
                res.status(200).json(reaction);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};