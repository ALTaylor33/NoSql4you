const { Reaction } = require('../models');

module.exports = {
  // Get all reactions
  getReactions(req, res) {
    Reaction.find()
      .then((reactions) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single reaction
  getSingleReaction(req, res) {
    Reaction.findById(req.params.reactionId)
      .select('-__v')
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).json({ message: 'No reaction with that ID' });
        }
        return res.json(reaction);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Reaction.findByIdAndDelete(req.params.reactionId)
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).json({ message: 'No reaction with that ID' });
        }
        return res.json({ message: 'Reaction successfully deleted' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a reaction
  updateReaction(req, res) {
    Reaction.findByIdAndUpdate(
      req.params.reactionId,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).json({ message: 'No reaction with that ID' });
        }
        return res.json(reaction);
      })
      .catch((err) => res.status(500).json(err));
  },
};