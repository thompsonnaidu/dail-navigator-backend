const express=require("express");
const router=express.Router();

const {Session,User}=require("../models/")


// GET request to fetch clients for a therapist
router.get('/therapist/clients', async (req, res) => {
    try {
        const { userStoreDate } = req.authUserInfo;

        // Find sessions for the therapist
        const sessions = await Session.find({ therapistId: authUser.id });

        // Extract unique client IDs from sessions
        const clientIds = sessions.map(session => session.clientId);
        const uniqueClientIds = [...new Set(clientIds)];

        // Fetch client information from User model
        const clients = await User.find({ _id: { $in: uniqueClientIds }, role: 'client' });

        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports=router;