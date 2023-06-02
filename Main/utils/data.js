const usernames = [
  'alice',
  'bob',
  'charlie',
  'david',
  'emma',
  'frank',
  'grace',
  'henry',
  'isabella',
  'jack',
  'kate',
  'liam',
  'maya',
  'nathan',
  'olivia',
  'peter',
  'quinn',
  'rachel',
  'samuel',
  'taylor',
  'victor',
  'willow',
  'xavier',
  'yara',
  'zoe',
  'alex',
  'bella',
  'chloe',
  'dylan',
  'ella',
  'finn',
  'gabriella',
  'hannah',
  'ian',
  'julia',
  'kyle',
  'lily',
  'mason',
  'natalie',
  'owen',
  'piper',
  'quincy',
  'ruby',
  'sebastian',
  'tessa',
  'violet',
  'wyatt',
  'xander',
  'yasmine',
  'zara'
];

const thoughts = [
  "Just had the most amazing meal at my favorite restaurant! Highly recommend it.",
  "Feeling grateful for all the wonderful people in my life.",
  "Can't wait for the weekend! Planning to relax and recharge.",
  "Just finished reading an incredible book. It's a must-read for everyone!",
  "Enjoying a beautiful sunset at the beach.",
  "Excited about my upcoming travel adventure!",
  "Trying out a new hobby and loving it.",
  "Feeling inspired by the amazing artwork at the museum.",
  "Spent the day volunteering and it was so rewarding.",
  "Celebrating a milestone achievement. Hard work pays off!",
  "Enjoying a cup of coffee and a good conversation with a friend.",
  "Exploring new music genres and discovering some hidden gems.",
  "Feeling motivated and ready to tackle my goals.",
  "Happiness is spending quality time with loved ones.",
  "Grateful for the simple joys in life."
];

// Get a random item given an array
const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random username
const getRandomUsername = () => getRandomArrayItem(usernames);

// Function to generate random thoughts
const getRandomThoughts = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(getRandomArrayItem(thoughts));
  }
  return result;
};

module.exports = { getRandomUsername, getRandomThoughts };

