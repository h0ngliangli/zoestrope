import logger from './logger.js'
const firebaseAdminKeyFile = process.env.FIREBASE_ADMIN_KEY_FILE
logger.debug(`firebaseAdminKeyFile: ${firebaseAdminKeyFile}`)

import fs from "fs"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
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

async function search(kw="", tag="") {
    logger.debug("search ")
}


export default {
  saveFlashcard,
  getFlashcardById,
}
