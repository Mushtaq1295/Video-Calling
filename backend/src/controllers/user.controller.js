import User from "../models/User.model";
import FriendRequest from "../models/FriendRequest.model";
import FriendRequest from "../models/FriendRequest.model";

export async function getRecommendedUsers(req,res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId }}, //exclude current user
                { $and: { $nin: currentUser.friends}}, //exclude current user's friends
                { isOnBoarded: true },
            ]
        });
        res.status(200).json(recommendedUsers)
    } catch (error) {
        console.log('Error in getRecommendedUsers controller:',error)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id)
        .select('friends')
        .populate('friends','fullName profilePic nativeLanguage learningLanguage');

        res.status(200).json(user.friends);
    } catch (error) {
        console.log('Error in getMyFriends controller',error)
        res.status(500).json({message: 'Internal Server Error'})
    }
};

export async function sendFriendRequest(req,res) {
    try {
        const myId = req.user.id;
        const {id:recepientId} = req.params;
        if(myId === recepientId) return res.status(400).json({message: 'You cannot send messages to yourself'})
        
        const recepient = await User.findById(recepientId)
        if(!recepient) return res.status(404).json({message: 'Recepient not found'})
        if (recepient.friends.includes(myId)) return res.status(400).json({message: 'You are already friends with this user'})
         
        //check if a  req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [],
        });

    } catch (error) {
        
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const {id:requestId} = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest){
            return res.status(404).json({message: "Friend request not found"});
        }

        //verify if the current user is recepient
        if(friendRequest.recepient.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept this request"});
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        //add each user to the other's friends array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recepient},
        });

        await User.findByIdAndUpdate(friendRequest.recepient, {
            $addToSet: { friends: friendRequest.sender},
        });

        res.status(200).json({message: "Friend request accepted"});

    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

export async function getFriendRequests(req,res){
    try {
        const incomingReqs = await FriendRequest.find({
            recepient: req.user.id,
            status:pending,
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status:pending,
        }).populate("sender","fullName profilePic");

        res.status(200).json({incomingReqs, acceptedReqs});
    } catch (error) {
        console.log("Error in getPendingFriendRequests controller", error.message);
        res.status(500).json({message: "Internal Server error"});
    }
}

export async function getOutgoingFriendReqs(req,res) {
    try {
        const outgoingRequests = await FriendRequest.find({
            recepient: req.user.id,
            status:pending,
        }).populate("recepient","fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({outgoingRequests});
    } catch (error) {
        console.log("Error in getOutgoingFriendReqs controller", error.message);
        res.status(500).json({message: "Internal Server error"});
    }
}