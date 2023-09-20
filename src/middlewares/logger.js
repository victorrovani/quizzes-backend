var morgan = require("morgan");
var path = require("path");
var rfs = require("rotating-file-stream"); // version 2.x
const {
  LOG_LEVEL,
  LOG_FILE,
  LOG_INTERVAL,
  LOG_SIZE,
  LOG_COMPRESS,
  LOG_MAX_FILES,
  LOG_MAX_SIZE,
} = process.env;

if (LOG_FILE) {
  let logDirectorsParts = LOG_FILE.split("/");
  let filename = logDirectorsParts.pop();
  var accessLogStream = rfs.createStream(filename, {
    interval: LOG_INTERVAL, // rotate daily
    size: LOG_SIZE ? LOG_SIZE : undefined,
    compress: LOG_COMPRESS ? LOG_COMPRESS : "gzip",
    maxFiles: LOG_MAX_FILES ? parseInt(LOG_MAX_FILES) : undefined,
    path: path.join(__dirname, `../../${logDirectorsParts.join("/")}`),
  });
}

module.exports = [
  morgan("common", {
    stream: accessLogStream,
  }),
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  }),
];
