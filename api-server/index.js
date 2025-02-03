// entry point of the api-server

import cors from "cors"
import create_logger from './logger.js'
import env from "./env.js"
import express from "express"
import api from "./api.js"

const logger = create_logger("api-server", "blue")
const webapp = express()
webapp.use(cors()) // enable Cross Origin Resource Sharing and allow all origins
webapp.use(express.json()) // enable JSON body parsing


webapp.get("/", (req, res) => {
  res.send("api-server is running.")
})

// router of /flashcard/*
webapp.use("/flashcard", api)

// start the server
webapp.listen(env.port, () => {
  logger.info(`api-server is running on port ${env.port}`)
})
