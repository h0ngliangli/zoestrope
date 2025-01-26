const firebaseAdminKeyFile = process.env.FIREBASE_ADMIN_KEY_FILE;
console.log(`firebaseAdminKeyFile: ${firebaseAdminKeyFile}`);

import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const serviceAccount = JSON.parse(fs.readFileSync(firebaseAdminKeyFile));
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(firebaseApp);
const flashcardCol = db.collection("flashcards");
function saveFlashcard(flashcard) {
    console.log("saveFlashcard: ", flashcard);
    // TODO
}

async function getFlashcardById(id) {
    console.log("getFlashcardById: ", id);
    const flashcard = await flashcardCol.doc(id).get()
    if (!flashcard.exists) {
        console.log("No such document!");
        return;
    }
    console.log("flashcard: ", flashcard.data());
    return flashcard.data();
}
export default {
    saveFlashcard,
    getFlashcardById,
};
