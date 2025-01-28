import pino from "pino"

const logger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
    },
  },
})

logger.info("Logger initialized")

export default logger
