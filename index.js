const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/dbConnect");
const cpachaRoutes = require("./routes/captchaRoute");
const razorpayRoutes = require("./routes/razorpayRoutes");
const authRoutes = require('./routes/authroutes')

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors());

database()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/captcha", cpachaRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/auth", authRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
