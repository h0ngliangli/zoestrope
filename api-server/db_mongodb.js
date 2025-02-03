import create_logger from "./logger.js"
import env from "./env.js"
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"

const logger = create_logger("db_mongodb", "yellow")
const mongoClient = new MongoClient(env.mongodb.url, {
  tlsCertificateKeyFile: env.mongodb.key_file,
  serverApi: ServerApiVersion.v1,
})

await mongoClient.connect()
await mongoClient.db("admin").command({ ping: 1 })
logger.info("mongodb is connected")

const database = mongoClient.db(env.mongodb.db)

// insert a new document and return the inserted id
async function db_insert_doc(col_name, doc) {
  logger.info("db_insert_doc(%s, %o)", col_name, doc)
  const result = await database.collection(col_name).insertOne(doc)
  logger.info("db_insert_doc => %o", result)
  return result.insertedId
}

async function db_get_doc(col_name, id) {
  logger.info("db_get_doc(%s, %s)", col_name, id)
  const result = await database
    .collection(col_name)
    .findOne({ _id: ObjectId.createFromHexString(id) })
  logger.info("db_get_doc => %o", result)
  return result
}

async function db_delete_doc(col_name, id) {
  logger.info("db_delete_doc(%s, %s)", col_name, id)
  const result = await database
    .collection(col_name)
    .deleteOne({ _id: ObjectId.createFromHexString(id) })
  logger.info("db_delete_doc => %o", result)
  return result.deletedCount
}

async function db_update_doc(col_name, doc) {
  logger.info("db_update_doc(%s, %o)", col_name, doc)
  const id = doc.id
  delete doc.id
  const result = await database
    .collection(col_name)
    .updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: doc }
    )
  logger.info("db_update_doc => %o", result)
  return result.modifiedCount
  
}

export async function db_insert_flashcard(flashcard) {
  return await db_insert_doc("flashcard", flashcard)
}

export async function db_get_flashcard(id) {
  return await db_get_doc("flashcard", id)
}

export async function db_delete_flashcard(id) {
  return await db_delete_doc("flashcard", id)
}

export async function db_update_flashcard(flashcard) {
  return await db_update_doc("flashcard", flashcard)
}


export async function db_close() {
  logger.info("db_close")
  await mongoClient.close()
}


export default {
  db_insert_flashcard,
  db_get_flashcard,
  // getFlashcardById,
  // searchFlashcards,
  // createFlashcard,
}
