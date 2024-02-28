const express = require('express');
const router = express.Router();
const {User,ProgramQuestion} = require('../models/');
const auth= require("../middlewares/auth.middlewares");

// POST request to create ProgramQuestion
router.post('/', async (req, res) => {
    try {
        // Check if all required information is present
        const { analysis, queries, sessionId, clientId, therapistId } = req.body;
        if (!analysis || !queries || !sessionId || !clientId || !therapistId) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Check if sessionId, clientId, and therapistId are valid user IDs
        const sessionExists = await User.exists({ _id: sessionId });
        const clientExists = await User.exists({ _id: clientId });
        const therapistExists = await User.exists({ _id: therapistId });
        if (!sessionExists || !clientExists || !therapistExists) {
            return res.status(400).json({ message: "Invalid sessionId, clientId, or therapistId provided" });
        }

        // Set generated date to current date
        const generatedDate = new Date();

        // Set deadline to current date plus 3 days
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 3);

        const newProgramQuestion = new ProgramQuestion({
            analysis,
            queries,
            sessionId,
            clientId,
            therapistId,
            generatedDate,
            deadline
        });

        const savedProgramQuestion = await newProgramQuestion.save();
        res.status(201).json(savedProgramQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// PUT request to update ProgramQuestion
router.put('/:id',auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { userDataStore } = req.authUserInfo; 

        // Check if the updated record belongs to the authenticated user
        const question = await ProgramQuestion.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        if (question.clientId.toString() !== userDataStore.id) {
            return res.status(403).json({ message: "You are not authorized to update this question" });
        }

        // Force the submitted date to be the current date
        req.body.submittedDate = new Date();

        // Ensure all answers in queries are present
        const { queries } = req.body;
        if (!queries || !Array.isArray(queries) || queries.length === 0 || queries.some(q => !q.answer)) {
            return res.status(400).json({ message: "All queries must have answers" });
        }

        // Prevent updating deadline and generatedDate fields
        delete req.body.deadline;
        delete req.body.generatedDate;

        const updatedQuestion = await ProgramQuestion.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
