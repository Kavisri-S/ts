const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  subject: String,
  description: String,
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Hash password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
});

module.exports = {
  Ticket: mongoose.model('tickets', ticketSchema),
  User: mongoose.model('users', userSchema)
};
