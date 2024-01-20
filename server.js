const app = require("./app");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDatabase = require("./db/database");
const cloudinary = require("cloudinary");

// Config
dotenv.config();
connectDatabase();


// Clodinary Config
cloudinary.config({
  cloud_name: "drbzzh6j7",
  api_key: "776943229854165",
  api_secret: "RWZatGE-U7hTRE0Re8XM8JnVv84",
});


// Port
const PORT = process.env.PORT || 8000;


// Server Started
app.listen(PORT, () => {
  console.log(`Server Is Running On the port: ${PORT}`.rainbow);
});
