import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userDetails: {
    type: mongoose.Schema.ObjectId,
    ref: "UsersDetails",
    unique: true,
    required: [true, "User details reference Id is required"]
},
  content: {
    type: String,
    maxlength: [350, "Notification should not exceed 350 characters"],
    minLength: [3, "Minimum 3 characters required"],
    required: true
  },
  category: {
    type: String,
    required: true
  },
 
},{ timestamps: true });

mongoose.models = {}

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;