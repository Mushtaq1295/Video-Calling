import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:
        { type: String, required: true },

    email:
        {type: String, required: true, unique: true },

    password: 
        {type: String, required: true, minlength: 6},

    bio:
        {type: String, default: ""},

    profilePic:
         {type: String, default: ""},

    nativeLanguage: 
        {type: String, default: ""},

    learningLanguage:
         {type: String, default: ""},

    location:
         {type: String, default: ""},

    isOnBoarded: 
        {type: Boolean, default: false},

    friends: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]   
    },
    { timestamps: true }
);

const User = mongoose.model("User",userSchema);

//prehook
userSchema.pre("save",async function(next){
    if(!this.isMofified("password")) return next();
    //123456 => kjnber
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
    }
})

export default User;