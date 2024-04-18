require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWTSecret = process.env.JWTSecret;

module.exports = { MONGO_URI, PORT, JWTSecret };