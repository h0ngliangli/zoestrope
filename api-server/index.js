import express from "express";
import cors from "cors";
import "dotenv/config";
import flashcard from "./flashcard.js";
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("api-server is running.");
});

app.get('/flashcard/get', flashcard.getById);

app.listen(process.env.PORT, () => {
  console.log(`api-server is running on port ${process.env.PORT}`);
});
