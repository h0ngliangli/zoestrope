import express from "express"
import cors from "cors"
import "dotenv/config"
import flashcard from "./flashcard.js"
import logger from './logger.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("api-server is running.")
})

app.get("/flashcard/get", flashcard.getById)

app.get("/flashcard/search", flashcard.search)

app.post("/flashcard/create", flashcard.create)

app.listen(process.env.PORT, () => {
  logger.info(`api-server is running on port ${process.env.PORT}`)
})
