import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { Url } from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 10000;
const serverUrl = process.env.SERVER_URL;

app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1/shorten-url", Url);

app.listen(port, () => {
  console.log(`Server is running at ${serverUrl}:${port}`);
});