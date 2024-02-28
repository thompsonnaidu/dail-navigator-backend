const express = require('express');
const router = express.Router();
const {DBTQuestion, User} = require('../models/index');

const auth= require("../middlewares/auth.middlewares");

// POST request to create DBTQuestion
router.post('/', auth,async (req, res) => {
    try {

        // Check if therapistId and clientId exist in the User model
        const { therapistId, clientId, submittedDate, answers } = req.body;
        if (!therapistId || !clientId || !submittedDate || !answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }
        const therapistExists = await User.exists({ _id: therapistId });
        const clientExists = await User.exists({ _id: clientId });
        
        if (!therapistExists || !clientExists) {
            return res.status(400).json({ message: "Invalid therapistId or clientId provided" });
        }

        // Ensure all required fields in answers are provided
        for (const answer of answers) {
            if (!answer.emotional || !answer.urges || !answer.Behavior || !answer.dbtSkill || !answer.EffectivenessDbtSkill) {
                return res.status(400).json({ message: "All required fields in answers must be provided" });
            }
        }

        // Set generated date to current date
        const generatedDate = new Date();

        // Set deadline to current date plus 3 days
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 3);

        const newQuestion = new DBTQuestion({
            therapistId,
            submittedDate,
            deadline: deadlineDate,
            generatedDate,
            answers
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// PUT request to update DBTQuestion
router.put('/:id', auth,async (req, res) => {
    try {
        const { id } = req.params;
        const { userDataStore } = req.authUserInfo; // Assuming auth user information is available in req.authUser

        // Check if the updated record belongs to the user
        const question = await DBTQuestion.findById(id);
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
            req.body["submittedDate"]= new Date();
        }

        // Ensure all required fields in answers are provided
        const { answers } = req.body;
        if (!answers) {
            return res.status(400).json({ message: "At least one answer must be provided" });
        }
        // for (const answer of answers) {
        //     if (!answer.emotional || !answer.urges || !answer.Behavior || !answer.dbtSkill || !answer.EffectivenessDbtSkill) {
        //         return res.status(400).json({ message: "All required fields in answers must be provided" });
        //     }
        // }

        // Prevent updating deadline and generatedDate fields
        delete req.body.deadline;
        delete req.body.generatedDate;
        delete req.body.clientId;
        delete req.body.therapistId;
        const updatedQuestion = await DBTQuestion.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports=router;