type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  message: string;
  context?: string;
  data?: unknown;
}

function formatLog(level: LogLevel, { message, context, data }: LogPayload) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]${context ? ` [${context}]` : ""}`;
  return { prefix, message, data };
}

export const logger = {
  info(message: string, context?: string, data?: unknown) {
    const formatted = formatLog("info", { message, context, data });
    if (data !== undefined) {
      console.log(formatted.prefix, formatted.message, data);
    } else {
      console.log(formatted.prefix, formatted.message);
    }
  },

  warn(message: string, context?: string, data?: unknown) {
    const formatted = formatLog("warn", { message, context, data });
    if (data !== undefined) {
      console.warn(formatted.prefix, formatted.message, data);
    } else {
      console.warn(formatted.prefix, formatted.message);
    }
  },

  error(message: string, context?: string, error?: unknown) {
    const formatted = formatLog("error", { message, context, data: error });
    if (error !== undefined) {
      console.error(formatted.prefix, formatted.message, error);
    } else {
      console.error(formatted.prefix, formatted.message);
    }
  },

  debug(message: string, context?: string, data?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      const formatted = formatLog("debug", { message, context, data });
      if (data !== undefined) {
        console.debug(formatted.prefix, formatted.message, data);
      } else {
        console.debug(formatted.prefix, formatted.message);
      }
    }
  },
};
