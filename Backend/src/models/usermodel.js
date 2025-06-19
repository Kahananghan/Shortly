import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "", 
    },
});

// Function to generate Gravatar URL
function gravatarurl(email) { 
    const hash = crypto
       .createHash('md5')
       .update(email.trim().toLowerCase())
       .digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}

// Automatically generate avatar if not provided
userSchema.pre("save", function (next) {
    if (!this.avatar) {
        this.avatar = gravatarurl(this.email);
    }
    next();
});

export default mongoose.model("user", userSchema);