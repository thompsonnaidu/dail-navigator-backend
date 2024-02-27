const express= require('express');

const connectDB= require('./config/db');
const app= express();
const {User} = require('./models/index');
// initialise middleware
app.use(express.json({ extended: false }));

connectDB();

const PORT= process.env.PORT || 6000;

// Start the server @ port 
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})