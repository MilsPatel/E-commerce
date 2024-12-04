require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path based on your project structure

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    createAdminUser();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to create an admin user
async function createAdminUser() {
  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create a new admin user
    const hashedPassword = await bcrypt.hash('0123456789', 10); // Replace with a secure password
    const adminUser = new User({
      userName: 'MilanAdmin',
      email: 'milanadmin@gmail.com', // Replace with the desired email
      password: hashedPassword,
      isAdmin: true, // Ensure this property sets the user as an admin
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}
