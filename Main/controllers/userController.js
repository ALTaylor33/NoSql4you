const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () => {
  const count = await User.countDocuments();
  return count;
};

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findById(req.params.userId)
      .select('-__v')
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        const grade = await grade(req.params.userId);
        return res.json({ user, grade });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove them from the thoughts
  deleteUser(req, res) {
    User.findByIdAndRemove(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
        return Thought.updateMany(
          { username: user.username },
          { $pull: { reactions: { username: user.username } } }
        );
      })
      .then(() => res.json({ message: 'User successfully deleted' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a thought to a user
  addThought(req, res) {
    const { userId } = req.params;
    const thought = req.body;

    User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID' });
        }
        return res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a thought from a user
  removeThought(req, res) {
    const { userId, thoughtId } = req.params;

    User.findByIdAndUpdate(
      userId,
      { $pull: { thoughts: { _id: thoughtId } } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID' });
        }
        return res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};