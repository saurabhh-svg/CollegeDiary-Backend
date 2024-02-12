import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import { config } from "dotenv";
import path from "path";
//import { request } from "http";

const __dirname = path.resolve();
const app = express();
config();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT))
  .then(() =>
    console.log("Working and listening to localhost 3000 and Mongo Connected")
  )
  .catch((err) => console.log(err));
