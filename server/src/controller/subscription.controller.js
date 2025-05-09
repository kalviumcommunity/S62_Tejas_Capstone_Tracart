import Subscription from "../models/subscriptionModel.js";

const createSubscription = async (req, res) => {
  const {
    srevice_name,
    plan_name,
    cost,
    currency,
    billing_cycle,
    start_date,
    next_renewal_date,
    status,
    reminder_enabled,
  } = req.body;
};
