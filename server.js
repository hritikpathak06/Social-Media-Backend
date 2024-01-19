const app = require("./app");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDatabase = require("./db/database");

// Config
dotenv.config();
connectDatabase();

// Port
const PORT = process.env.PORT || 8000;


// Server Started
app.listen(PORT, () => {
  console.log(`Server Is Running On the port: ${PORT}`.rainbow);
});
