import database from "./database.js";

async function getById(req, res) {
  const id = req.query.id;
  console.log("getById: ", id);
  const flashcard = await database.getFlashcardById(id);
  if (!flashcard) {
    console.log("No such document!");
    res.sendStatus(404);
    return;
  }
  console.log("flashcard: ", flashcard);
  res.send(flashcard);
}

export default {
  getById,
};
