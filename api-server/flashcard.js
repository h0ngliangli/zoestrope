import database from "./database.js"
import logger from "./logger.js"

async function getById(req, res) {
  const id = req.query.id
  logger.debug("getById: ", id)
  const flashcard = await database.getFlashcardById(id)
  if (!flashcard) {
    logger.debug("No such document!")
    res.sendStatus(404)
    return
  }
  logger.debug("flashcard: ", flashcard)
  res.send(flashcard)
}

async function search(req, res) {
  logger.debug("handling request %s", req.url)
  const kw = req.query.kw
  const tag = req.query.tag
  const flashcards = await database.searchFlashcards(kw, tag)
  logger.debug("flashcards: ", flashcards)
  res.send(flashcards)
}

async function create(req, res) {
  const flashcard = req.body
  logger.debug("create: ", flashcard)
  const id = await database.createFlashcard(flashcard)
  res.send(id)
}

export default {
  getById,
  search,
  create,
}
