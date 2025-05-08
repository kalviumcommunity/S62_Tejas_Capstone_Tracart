import express from "express";
const router = express.Router();

import { createUser, fetchAllUsers } from "../controller/user.controller.js";

router.post("/", createUser);
router.get("/", fetchAllUsers);

export default router;
