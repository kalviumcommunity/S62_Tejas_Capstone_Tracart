import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("the 5 am club.");
});

app.use("/users", userRouter);

export default app;
