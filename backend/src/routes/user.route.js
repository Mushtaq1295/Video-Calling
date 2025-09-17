import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs, sendFriendRequest } from "../controllers/user.controller";

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);

router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest)

router.get("/friend-requests",getFriendRequests);
router.get('/outgoing-friend-requests',getOutgoingFriendReqs);


export default router;

