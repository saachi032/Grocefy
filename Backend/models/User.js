// Bring in mongoose (used to define schemas and interact with MongoDB)
const mongoose = require('mongoose');

// Bring in bcryptjs for hashing passwords
const bcrypt = require('bcryptjs');
// Create a Schema (structure) for how a User document will look in MongoDB
const userSchema = mongoose.Schema(
  {
    // User's full name — required text field
    name: {
      type: String,
      required: true,
    },

    // User's unique email — cannot be empty and cannot duplicate
    email: {
      type: String,
      required: true,
      unique: true, // prevents two accounts with same email
    },

    // Password stored in hashed form — required
    password: {
      type: String,
      required: true,
    },
  },
  {
    // timestamps: true automatically adds `createdAt` and `updatedAt`
    timestamps: true,
  }
);



// Mongoose "pre-save hook":
// This function runs AUTOMATICALLY before saving the document to MongoDB.
// It is used here to hash the password.
userSchema.pre('save', async function (next) {

  // If the password field has NOT been modified, skip hashing.
  // (This prevents re-hashing an already hashed password)
  if (!this.isModified('password')) {
    next(); // Continue without hashing
  }

  // Generate a salt (random extra string to make hash more secure)
  const salt = await bcrypt.genSalt(10);

  // Replace plain text password with hashed password + salt
  this.password = await bcrypt.hash(this.password, salt);
});



// A custom method available on every User document:
// Used during login to compare entered password with stored hash.
userSchema.methods.matchPassword = async function (enteredPassword) {
  
  // bcrypt.compare() checks if entered password
  // when hashed matches the stored hashed password.
  return await bcrypt.compare(enteredPassword, this.password);
};



// Create the Mongoose model called "User"
// It will create a "users" collection in MongoDB
const User = mongoose.model('User', userSchema);

// Export so we can use it in controllers
module.exports = User;
