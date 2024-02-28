const express = require('express');
const router = express.Router();
const {BECQuestion,ProgramQuestion,DBTQuestion, User} = require('../models/index');

const auth= require("../middlewares/auth.middlewares");
const transcribeModel = require('../models/transcribe.model');

// GET request to fetch pending tasks
router.get('/pendingtasks', auth,async (req, res) => {
    try {
        const { userDataStore } = req.authUserInfo; 
        // Fetch pending tasks for DBTQuestion where clientId matches authUser
        const pendingDBT = await DBTQuestion.find({ submittedDate: null, clientId: userDataStore.id }).populate(['therapistId']);

        // Fetch pending tasks for ProgramQuestion where clientId matches authUser
        const pendingProgram = await ProgramQuestion.find({ submittedDate: null, clientId: userDataStore.id }).populate(['therapistId']);

        // Fetch pending tasks for BECQuestion where clientId matches authUser
        const pendingBEC = await BECQuestion.find({ submittedDate: null, clientId: userDataStore.id }).populate(['therapistId']);

        // Concatenate and return the list of pending tasks
        const pendingTasks = {dbtTask:[...pendingDBT],programTask:[...pendingProgram], becTask:[...pendingBEC]};
        res.json(pendingTasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint to fetch list of unique clients given therapistId
router.get('/:therapistId',auth ,async (req, res) => {
    try {
      const therapistId = req.params.therapistId;
      
      // Find all TranscribeSessions where therapistId matches
      const sessions = await transcribeModel.find({ therapistId: therapistId }).populate('clientId','name uuid email'); // Populating client details
  
  
      // Extracting unique client details from the sessions
      const clients = {};
      sessions.forEach(session => {
        const clientId = session._doc.clientId._id;
        if (!clients[clientId]) {
          clients[clientId] = {
            clientId: session.clientId._id,
            name: session.clientId.name,
            email: session.clientId.email,
            uuid:session.clientId.uuid
          };
        }
      });
  
      res.status(200).json(Object.values(clients));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports=router;