const express = require('express');
const router = express.Router();
const {BECQuestion, User} = require('../models/index');

const auth= require("../middlewares/auth.middlewares");

// PUT request to update BECQuestion
router.put('/:id', auth,async (req, res) => {
    try {
        const { id } = req.params;
        const { userDataStore } = req.authUserInfo; 
        // Check if the updated record belongs to the user
        const question = await BECQuestion.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        if (question.clientId.toString() !== userDataStore.id) {
            return res.status(403).json({ message: "You are not authorized to update this question" });
        }

       // Ensure the submitted date matches the one in the request
       if (req.body.submittedDate && new Date(req.body.submittedDate).toISOString() !== question.submittedDate.toISOString()) {
        return res.status(400).json({ message: "Submitted date must match the existing submitted date" });
    }else{
        req.body["sumbittedDate"]= new Date();
    }
    

        // Calculate total score
        let totalScore = 0;
        for (const answer of req.body.answer) {
            totalScore += answer.score;
        }
        req.body.totalScore = totalScore;

        // Prevent updating deadline and generatedDate fields
        delete req.body.deadline;
        delete req.body.generatedDate;
        delete req.body.clientId;
        delete req.body.therapistId;

        const updatedQuestion = await BECQuestion.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// POST request to create BECQuestion
router.post('/', auth,async (req, res) => {
    try {
        const { userDataStore } = req.authUserInfo; 
        // Check if therapistId and clientId exist in the User model
        const { therapistId, clientId } = req.body;
        const therapistExists = await User.exists({ _id: therapistId });
        const clientExists = await User.exists({ _id: clientId });
        
        if (!therapistExists || !clientExists) {
            return res.status(400).json({ message: "Invalid therapistId or clientId provided" });
        }
        // Calculate total score
        let totalScore = 0;
        for (const answer of req.body.answer) {
            totalScore += answer.score;
        }
        req.body.totalScore = totalScore;

        // Set generated date to current date
        req.body.generatedDate = new Date();

        // Set deadline to current date plus 3 days
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 3);
        req.body.deadline = deadlineDate;

        const newQuestion = new BECQuestion(req.body);
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




module.exports=router;