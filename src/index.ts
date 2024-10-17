import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { Url } from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1/shorten-url", Url);

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:${port}`);
});