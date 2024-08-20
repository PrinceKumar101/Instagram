require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const cookie = require("cookie");

app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("uploads"));
app.use(cors());
app.use(
  cors({
    origin: "*", // Replace with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // List HTTP methods
     // Allow cookies and credentials
  })
);


// Routes
const userRoute = require("./routes/user");

// Connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected..");
  })
  .catch((error) => {
    console.log("Error on db connection: ", error);
  });

app.use(
  session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
