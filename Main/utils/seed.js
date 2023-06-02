const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomThoughts } = require('./data');

connection.on('error', (err) => {
  console.error(err);
});

connection.once('open', async () => {
  console.log('Connected to the database.');

  try {
    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

    // Create an empty array to hold the users
    const users = [];

    // Loop 20 times - add users to the users array
    for (let i = 0; i < 20; i++) {
      // Get some random thoughts using a helper function that we imported from ./data
      const thoughts = getRandomThoughts(20); // Assuming you have a getRandomThoughts function

      // Create a new user object
      const user = {
        username: getRandomUser(), // Assuming you have a getRandomUser function
        thoughts: thoughts.map((thought) => thought._id), // Assuming thoughts have _id property
        friends: [],
      };

      users.push(user);
    }

    // Add users to the collection and await the results
    await User.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
});