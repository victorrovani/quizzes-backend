require("dotenv").config();
require("./config/module-alias.js");
const express = require("express");
const app = express();



// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
global.prisma = prisma;

// Cors
const cors = require("cors");
app.use(cors());

// File upload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Fire base
const admin = require("firebase-admin");
var serviceAccount = require("./config/firebase.json");
global.firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teste-e8c5d.firebaseio.com",
});

// Logger - Morgan
const morgan = require("./middlewares/logger");
app.use(...morgan);

// Start Express
const port = process.env.PORT || 3000;
app.use(express.json());

// Routes

app.use("/quiz", require("./routes/quiz/index.js"));

//404 error handler
app.use(function (req, res, next) {
  res.status(404).json({ success: false, message: "Page Not Found" });
});

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
