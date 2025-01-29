import pino from "pino"
import pinoCaller from "pino-caller"

let logger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
    },
  },
})
logger = pinoCaller(logger, {
  relativeTo: import.meta.dirname,
})

logger.info("Logger initialized")

export default logger
