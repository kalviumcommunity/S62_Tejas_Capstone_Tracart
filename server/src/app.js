import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import authRouter from "./routes/auth.route.js";
import verifyUser from "./middleware/verifyUser.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("the 5 am club.");
});

app.use("/users", userRouter);
app.use("/subscriptions", verifyUser, subscriptionRouter);
app.use("/auth", authRouter);

export default app;
