// Web API for flashcard related operations
import create_logger from "./logger.js"
import db from "./db.js"
import express from "express"
import model_flashcard from "./model_flashcard.js"

const logger = create_logger("api", "blue")
const router = express.Router()

// get flashcard by req.query.id
router.get("/get", async (req, res) => {
  logger.info(`${req.method} ${req.url}`)
  // get id from req.query
  const id = req.query.id
  logger.debug("id: %s", id)
  // check if id is provided
  if (!id) {
    logger.warn("id is required")
    res.status(400).json({ message: "id is required" })
    return
  }
  // get flashcard by id
  const flashcard = await db.db_get_flashcard(id)
  if (!flashcard) {
    logger.warn("flashcard not found")
    res.status(400).json({ message: `flashcard not found by id ${id}` })
    return
  }
  logger.info("response: %o", flashcard)
  res.send(flashcard)
})

// search flashcards by req.query.kw and req.query.tag
router.get("/search", async (req, res) => {
  logger.info(`${req.method} ${req.url}`)
  const kw = req.query.kw
  const tag = req.query.tag
  if (!kw && !tag) {
    logger.warn("kw or tag is required")
    res.status(400).json({ message: "kw or tag is required" })
    return
  }
  const flashcards = await db.searchFlashcards(kw, tag)
  logger.info("response: %o", flashcards)
  res.send(flashcards)
})

// create a new flashcard
router.post("/create", async (req, res) => {
  logger.info("%s %s %o", req.method, req.url, req.body)
  const flashcard = model_flashcard.to_flashcard(req.body)
  logger.info("flashcard to save is %o", flashcard)
  console.log("db.db_insert_flashcard", db.db_insert_flashcard)
  const id = await db.db_insert_flashcard(flashcard)
  const res_body = { id }
  logger.info("%s => %o", req.url, res_body)
  res.send(res_body)
})

// delete a flashcard by req.query.id
router.all("/delete", async (req, res) => {
  logger.info(`${req.method} ${req.url}`)
  const id = req.query.id
  if (!id) {
    logger.warn("id is required")
    res.status(400).json({ message: "id is required" })
    return
  }
  try {
    const deletedCount = await db.db_delete_flashcard(id)
    if (deletedCount === 0) {
      logger.warn(`flashcard not found by id ${id}`)
      res.status(400).json({ message: `flashcard not found by id ${id}` })
      return
    }
    const res_body = { message: `flashcard deleted by id ${id}` }
    logger.info(`${req.url} => %o`, res_body)
    res.send(res_body)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message })
  }
})

// update a flashcard by req.body
router.post("/update", async (req, res) => {
  logger.info(`${req.method} ${req.url}`)
  const patch = req.body
  logger.info("request body: %o", patch)
  try {
    await db.updateFlashcard(patch)
    const response = { message: "flashcard updated" }
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message })
  }
})

// attach an image to a flashcard
router.post("/attach-img", async (req, res) => {
  logger.info(`${req.method} ${req.url}`)
  res.status(501).json({ message: "not implemented" })
})

export default router
