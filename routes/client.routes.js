const express = require('express');
const router = express.Router();
const {BECQuestion,ProgramQuestion,DBTQuestion, User} = require('../models/index');

const auth= require("../middlewares/auth.middlewares");

// GET request to fetch pending tasks
router.get('/pendingtasks', auth,async (req, res) => {
    try {
        const { userDataStore } = req.authUserInfo; // Assuming auth user information is available in req.authUser

        // Fetch pending tasks for DBTQuestion where clientId matches authUser
        const pendingDBT = await DBTQuestion.find({ submittedDate: null, clientId: userDataStore.id });

        // Fetch pending tasks for ProgramQuestion where clientId matches authUser
        const pendingProgram = await ProgramQuestion.find({ submittedDate: null, clientId: userDataStore.id });

        // Fetch pending tasks for BECQuestion where clientId matches authUser
        const pendingBEC = await BECQuestion.find({ submittedDate: null, clientId: userDataStore.id });

        // Concatenate and return the list of pending tasks
        const pendingTasks = [...pendingDBT, ...pendingProgram, ...pendingBEC];
        res.json(pendingTasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports=router;