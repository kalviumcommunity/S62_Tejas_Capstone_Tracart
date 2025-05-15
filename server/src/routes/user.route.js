import express from "express";
const router = express.Router();

import { createUser, fetchAllUsers } from "../controller/user.controller.js";
import verifyUser from "../middleware/verifyUser.js";

router.post("/", createUser);
router.get("/", verifyUser, fetchAllUsers);

export default router;
