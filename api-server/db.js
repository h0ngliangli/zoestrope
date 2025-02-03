import env from "./env.js"
import create_logger from "./logger.js"
import { yellow } from "colorette"

const logger = create_logger("db", yellow)

logger.info("Database implementation: %s", env.db_impl)
const impl = await import(env.db_impl)
export default {
  db_insert_doc: impl.db_insert_doc,
}
