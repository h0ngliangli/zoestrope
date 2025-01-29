import logger from "./logger.js"
const firebaseAdminKeyFile = process.env.FIREBASE_ADMIN_KEY_FILE
logger.debug(`firebaseAdminKeyFile: ${firebaseAdminKeyFile}`)

import fs from "fs"
import { initializeApp, cert } from "firebase-admin/app"
import { Filter, getFirestore } from "firebase-admin/firestore"
const serviceAccount = JSON.parse(fs.readFileSync(firebaseAdminKeyFile))
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore(firebaseApp)
const flashcardCol = db.collection("flashcards")
function saveFlashcard(flashcard) {
  logger.debug("saveFlashcard: ", flashcard)
  // TODO
}

async function getFlashcardById(id) {
  logger.debug("getFlashcardById: ", id)
  const flashcard = await flashcardCol.doc(id).get()
  if (!flashcard.exists) {
    logger.debug("No such document!")
    return
  }
  logger.debug("flashcard: ", flashcard.data())
  return flashcard.data()
}

async function searchFlashcards(kw = "", tag = "") {
  logger.debug("search flashcards: %o", { kw, tag })
  let query = flashcardCol
  if (kw) {
    query = query.where(
      Filter.or(
        Filter.and(
          Filter.where("title", ">=", kw),
          Filter.where("title", "<=", kw + "\uf8ff")
        ),
        Filter.and(
          Filter.where("content", ">=", kw),
          Filter.where("content", "<=", kw + "\uf8ff")
        )
      )
    )
  }
  if (tag) {
    query = query.where("tags", "array-contains", tag)
  }
  const snapshot = await query.get()
  const flashcards = []
  snapshot.forEach((doc)=>{
    flashcards.push(doc.data())
  })
  logger.debug("flashcards: ", flashcards)
  return flashcards
}

async function createFlashcard(flashcard) {
  logger.debug("createFlashcard: ", flashcard)
  const docRef = await flashcardCol.add(flashcard)
  logger.debug("docRef: ", docRef)
  return docRef.id
}

export default {
  saveFlashcard,
  getFlashcardById,
  searchFlashcards,
  createFlashcard,
}
