const express= require('express');

const connectDB= require('./config/db');
const app= express();
const admin= require("firebase-admin");
const credentials= require("./config/firebase-credential.json");
const cors=require("cors");
admin.initializeApp({
    credential:admin.credential.cert(credentials)
})

// initialise middleware
app.use(express.json({ extended: false }));
app.use(cors())

app.use("/api/user",require("./routes/user.routes"))
app.use("/api/beckquestion",require("./routes/beckQuestion.routes"))
app.use("/api/dbtquestion",require("./routes/dbtQuestion.routes"))
app.use("/api/progressquestion",require("./routes/programQuestion.routes"))
app.use("/api/client",require("./routes/client.routes"))
connectDB();

const PORT= process.env.PORT || 8080;

// Start the server @ port 
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})