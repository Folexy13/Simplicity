import express from "express";
import http from "http";
import { PORT, MONGO_URI, connectDB } from "./config";
import createApp from "./app";

const startApp = async () => {
  const app = express();

  await connectDB(String(MONGO_URI));

  await createApp(app);

  const backend = http.createServer(app);

  backend
    .listen(PORT, (): void => {
      console.log(`backend running in background...`);
    })
    .on("listening", () =>
      console.log(`Backend Service listening on port ${PORT}...`)
    )
    .on("error", (err: any) => {
      console.log(err);
      process.exit();
    });
};

startApp();
