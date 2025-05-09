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
    plan_name: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
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
    next_renewal_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Paused", "Cancelled"],
      default: "Active",
    },
    reminder_enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
