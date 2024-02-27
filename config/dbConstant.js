const dotenv = require('dotenv');
dotenv.config();
module.exports ={
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Dial-db-cluster`,
};