import { MongoClient, ServerApiVersion } from "mongodb"
import env from "./env.js"
import create_logger from "./logger.js"
import { yellow } from "colorette"

const logger = create_logger("db_mongodb", yellow)
const mongoClient = new MongoClient(
  env.mongodb.url,
  {
    tlsCertificateKeyFile: env.mongodb.key_file,
    serverApi: ServerApiVersion.v1,
  }
)

await mongoClient.connect()
// ping
await mongoClient.db("admin").command({ ping: 1 })
logger.info("MongoDB is connected.")

const database = mongoClient.db(env.mongodb.db)
const flashcardsCol = database.collection("flashcards")

// insert a new document and return the inserted id
async function db_insert_doc(col_name, doc) {
  logger.info("db_insert_doc(%s, %o)", col_name, doc)
  const result = await database.collection(col_name).insertOne(doc)
  logger.debug("result: %o", result)
  return result.insertedId
}

export default {
  db_insert_doc,
  // getFlashcardById,
  // searchFlashcards,
  // createFlashcard,
}
