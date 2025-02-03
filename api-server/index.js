// entry point of the api-server

import cors from "cors"
import create_logger from './logger.js'
import env from "./env.js"
import express from "express"
import flashcard from "./api.js"

const logger = create_logger("api-server", "blue")
const webapp = express()
webapp.use(cors()) // enable Cross Origin Resource Sharing and allow all origins
webapp.use(express.json()) // enable JSON body parsing


webapp.get("/", (req, res) => {
  res.send("api-server is running.")
})

// ------------- routes ------------
// get flashcard by id
webapp.get("/flashcard/get", flashcard.flashcard_get)
// search flashcards by keyword and tag
webapp.get("/flashcard/search", flashcard.flashcard_search)
// create a new flashcard
webapp.post("/flashcard/create", flashcard.flashcard_create)
// delete a flashcard by id
webapp.delete("/flashcard/delete", flashcard.flashcard_delete)
// update a flashcard by id
webapp.put("/flashcard/update", flashcard.flashcard_update)

// start the server
webapp.listen(env.port, () => {
  logger.info(`api-server is running on port ${env.port}`)
})
