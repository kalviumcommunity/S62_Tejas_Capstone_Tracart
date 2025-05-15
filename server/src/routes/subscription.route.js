import express from "express";
const router = express.Router();
import {
  createSubscription,
  fetchSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../controller/subscription.controller.js";

router.get("/", fetchSubscriptions);
router.post("/", createSubscription);
// router.get("/:subscriptionId");
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
