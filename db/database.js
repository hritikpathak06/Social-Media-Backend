const mongoose = require("mongoose");

const connectDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully".yellow);
    } catch (error) {
        console.log("Error in the db connection".red);
        console.log(error);
    }
};

module.exports = connectDatabase;