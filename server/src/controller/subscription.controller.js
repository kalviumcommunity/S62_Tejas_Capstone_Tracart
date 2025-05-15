import Subscription from "../models/subscriptionModel.js";

const createSubscription = async (req, res) => {
  const { service_name, cost, currency, billing_cycle, start_date, status } =
    req.body;
  const { userId } = req.user;
  try {
    if (
      !service_name ||
      !cost ||
      !currency ||
      !billing_cycle ||
      !start_date ||
      !status
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const newSub = new Subscription({
      user_id: userId,
      service_name,
      cost,
      currency,
      billing_cycle,
      start_date,
      status,
    });
    await newSub.save();

    res.status(201).json({ message: "Subscription added!", data: newSub });
  } catch (error) {
    console.error("Error creating subscription: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchSubscriptions = async (req, res) => {
  const { userId } = req.user;
  try {
    const subs = await Subscription.find({ user_id: userId });
    res.json({ message: "All subscriptions - ", data: subs });
  } catch (error) {
    console.error("Error fetching subscriptions: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSubscription = async (req, res) => {
  const { service_name, cost, currency, billing_cycle, start_date, status } =
    req.body;

  const subId = req.params.id;
  // console.log(subId);
  try {
    if (
      !service_name ||
      !cost ||
      !currency ||
      !billing_cycle ||
      !start_date ||
      !status
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (typeof cost !== "number" || cost <= 0) {
      return res
        .status(400)
        .json({ message: "Cost must be a positive number" });
    }
    const updatedSub = await Subscription.findOneAndUpdate(
      { _id: subId },
      {
        $set: {
          service_name,
          cost,
          currency,
          billing_cycle,
          start_date,
          status,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully updated", data: updatedSub });
  } catch (error) {
    console.error("Error updating subscription: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export { createSubscription, updateSubscription, fetchSubscriptions };
