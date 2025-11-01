require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User').default;

(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable not set');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);

  // Create admin user
  const hashed = await bcrypt.hash('adminpassword', 10);
  await User.create({ email: 'admin@example.com', password: hashed, role: 'admin' });

  // Optionally create demo user
  const userHashed = await bcrypt.hash('userpassword', 10);
  await User.create({ email: 'user@demo.com', password: userHashed, role: 'user' });

  console.log('Seeded admin and user.');
  process.exit();
})();
