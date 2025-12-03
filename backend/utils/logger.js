import { config } from "../config/env.js";

const blue = '\x1b[34m';
const yellow = '\x1b[33m';
const green = '\x1b[32m';
const red = '\x1b[31m';
const cyan = '\x1b[36m';
const purple = '\x1b[35m';
const gray = '\x1b[90m';
const reset = '\x1b[0m';

const statusColor = (statusCode) => (
  statusCode >= 500 ? purple :
    statusCode >= 400 ? red :
      statusCode >= 300 ? cyan :
        green
)

function colorLog(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl != '/healthcheck') {
      const timestamp = new Date().toLocaleString('hu-HU').replace(',', '');
      console.log(`${gray}${timestamp}${reset} - ${blue}${req.method}${reset} ${cyan}${req.originalUrl}${reset} - ${statusColor(req.status)}${res.statusCode}${reset} from ${yellow}${req.ip}${reset} ${gray}(${duration}ms)${reset}`);
    }
  });
  next();
};

function errorLog(error, req, res, next) {
  console.error(`${red}Error${reset}`, {
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });

  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    error: error.message || 'Internal Server Error',
    ...(config.NODE_ENV === 'dev' && {stack: error.stack}),
  })
};

export { colorLog, errorLog };