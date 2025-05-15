import express from "express";
const router = express.Router();
import { loginUser, validate } from "../controller/auth.controller.js";
import verifyUser from "../middleware/verifyUser.js";

router.post("/login", loginUser);
router.get("/validate", verifyUser, validate);
export default router;
