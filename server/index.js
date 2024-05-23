import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Authrouter from "./routes/userRoute.js";

dotenv.config();
const app = express();
const port = 8080 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world Server is alive");
});

app.use("/api/ScholarFinder/", Authrouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => app.listen(port || process.env.PORT))
  .then(() =>
    console.log(
      `Connected to DataBase and Listenig PORT ${process.env.PORT} AND Running on http://localhost:8080/ `
    )
  )
  .catch((error) => console.log(error));
