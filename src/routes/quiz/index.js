var express = require("express");
var router = express.Router();
const QUIZ_CONTROLLER = require("@src/controllers/quiz");
const AUTH = require("@src/middlewares/auth");

router.post("/", QUIZ_CONTROLLER.register);

module.exports = router;

