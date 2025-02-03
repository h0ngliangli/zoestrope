// Web API for flashcard related operations
import db from "./db.js"
import create_logger from "./logger.js"
import model_flashcard from "./model_flashcard.js"

const logger = create_logger("api", "blue")

// get flashcard by req.query.id
async function flashcard_get(req, res) {
  logger.info(`${req.method} ${req.url}`)
  // get id from req.query
  const id = req.query.id
  // check if id is provided
  if (!id) {
    logger.warn("id is required")
    res.status(400).json({ message: "id is required" })
    return
  }
  // get flashcard by id
  const flashcard = await db.getFlashcardById(id)
  if (!flashcard) {
    logger.warn("flashcard not found")
    res.status(400).json({ message: `flashcard not found by id ${id}` })
    return
  }
  logger.info("response: %o", flashcard)
  res.send(flashcard)
}

// search flashcards by req.query.kw and req.query.tag
async function flashcard_search(req, res) {
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
}

// create a new flashcard
async function flashcard_create(req, res) {
  logger.info(`${req.method} ${req.url}`)
  const flashcard = model_flashcard.toFlashcard(req.body)
  logger.info("request body: %o", flashcard)
  const id = await db.db_insert_doc("flashcard", flashcard)
  logger.info("response: %o", { id })
  res.send({ id })
}

// delete a flashcard by req.query.id
async function flashcard_delete(req, res) {
  logger.info(`${req.method} ${req.url}`)
  const id = req.query.id
  if (!id) {
    logger.warn("id is required")
    res.status(400).json({ message: "id is required" })
    return
  }
  try {
    await db.deleteFlashcardById(id)
    const response = { message: `flashcard deleted by id ${id}` } 
    res.send(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message })
  }
}

// update a flashcard by req.body
async function flashcard_update(req, res) {
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
}

// attach an image to a flashcard
async function flashcard_attach_img(req, res) {
  logger.info(`${req.method} ${req.url}`)
  res.status(501).json({ message: "not implemented" })
}

export default {
  flashcard_get,
  flashcard_search,
  flashcard_create,
  flashcard_delete,
  flashcard_update,
  flashcard_attach_img,
}
