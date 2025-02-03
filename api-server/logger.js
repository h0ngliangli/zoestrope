import pino from "pino"
import { white } from "colorette"
import pino_pretty from "pino-pretty"

function create_logger(msgPrefix = "", colorette_func = white) {
  const logger = pino(
    {
      msgPrefix: msgPrefix ? `[${msgPrefix}] ` : "",
      level: "debug",
    },
    pino_pretty({
      colorize: true,
      ignore: "hostname,pid",
      messageFormat: (log, messageKey, levelLabel, { colors }) => {
        return `\n\t${colorette_func(log[messageKey])}`
      },
    })
  )
  logger.info("logger initialized")
  return logger
}

export default create_logger
