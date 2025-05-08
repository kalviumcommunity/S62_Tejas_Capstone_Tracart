import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import connectDB from "./database/db.js";
import app from "./app.js";

const port = process.env.PORT || 3001;

const server = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

server();
