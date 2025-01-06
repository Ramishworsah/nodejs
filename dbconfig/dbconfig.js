const mongoose = require('mongoose');
require('dotenv').config();

const dbconnect = () => {
    const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/defaultdb";

    mongoose.connect(dbUrl)
        .then(() => {
            console.log('Connection is successful!');
        })
        .catch((err) => {
            console.error('Error in DB connection:', err.message);
            process.exit(1); // Exit with a non-zero code to indicate failure
        });
};

module.exports = dbconnect;
