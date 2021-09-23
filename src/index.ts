import express, { Request, Response, json, urlencoded } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { urlShortenRoute } from "./routes/url";
import { errorHandler } from "./middlewares/error-handler";
import { redirectRouter } from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api", urlShortenRoute);
app.use("/api", redirectRouter);

const PORT = process.env.PORT || 4000;

app.use(errorHandler);

const startup = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected to mongodb");
  } catch (err) {
    console.log("unable to connect to mongodb");
  }
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
};

startup();
