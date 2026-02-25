import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service_name: {
      type: String,
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD"],
    },
    billing_cycle: {
      type: String,
      required: true,
      enum: ["Monthly", "Yearly", "Weekly", "Quarterly"],
    },
    start_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Paused", "Cancelled"],
      default: "Active",
    },
    category: {
      type: String,
      enum: [
        "Entertainment",
        "Productivity",
        "Cloud",
        "Fitness",
        "News",
        "Education",
        "Other",
      ],
      default: "Other",
    },
    free_trial: {
      type: Boolean,
      default: false,
    },
    trial_end_date: {
      type: Date,
    },
    reminder_days: {
      type: Number,
      enum: [1, 3, 7],
      default: 1,
    },
    color: {
      type: String,
      default: "#8B5CF6", // Purple
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
