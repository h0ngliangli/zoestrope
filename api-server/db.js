import env from "./env.js"
import create_logger from "./logger.js"

const logger = create_logger("db", "yellow")

logger.info("database implementation is %s", env.db_impl)
const impl = await import(env.db_impl)
export default {
  db_insert_flashcard: impl.db_insert_flashcard,
  db_get_flashcard: impl.db_get_flashcard,
  db_delete_flashcard: impl.db_delete_flashcard,
  db_close: impl.db_close,
}
