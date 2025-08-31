import User from "../models/User.model";
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