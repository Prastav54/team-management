const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require("./config/database.js");
const cloudinary = require('cloudinary');

process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

dotenv.config({ path: "./config/config.env" })

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error ${err.message}`);
    console.log('Shutting down due to unhandled promise rejection');

    server.close(() => {
        process.exit(1)
    })
})