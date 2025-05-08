import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  reminderDate: { type: Date, required: true },
  method: { type: String, enum: ["Email", "Notification"], required: true },
  status: { type: String, enum: ["Sent", "Pending"], default: "Pending" },
});

export default mongoose.model("Reminder", reminderSchema);
