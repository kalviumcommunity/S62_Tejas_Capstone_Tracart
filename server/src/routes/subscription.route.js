import express from "express";
const router = express.Router();
import {
  createSubscription,
  fetchSubscriptions,
  updateSubscription,
} from "../controller/subscription.controller.js";

router.get("/", fetchSubscriptions);
router.post("/", createSubscription);
// router.get("/:subscriptionId");
router.put("/:subId", updateSubscription);

export default router;
