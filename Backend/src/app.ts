import express from "express";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import adminRouter from "./routes/adminRouter";

const app = express();

app.use(bodyParser.json());

dotenv.config();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err });
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
});

app.use("/admin", adminRouter);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING ?? "")
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server is Startig at http://localhost:${process.env.PORT ?? ""}`);
  })
  .catch((err: Error) => {
    console.log(`MongoDb Connection :  ${err.message}`);
  });
