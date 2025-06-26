import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password not required for Google users
        },
        minlength: 6
    },
    googleId: {
        type: String,
        sparse: true // Allow multiple null values but unique non-null values
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: "", 
    },
}, {
    timestamps: true
});

// Function to generate Gravatar URL
function gravatarurl(email) { 
    const hash = crypto
       .createHash('md5')
       .update(email.trim().toLowerCase())
       .digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}

// Hash password and generate avatar before saving
userSchema.pre("save", async function (next) {
    if (!this.avatar) {
        this.avatar = gravatarurl(this.email);
    }
    
    // Hash password if it's modified and exists
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    // Handle both hashed and unhashed passwords
    if (this.password.startsWith('$2')) {
        return await bcrypt.compare(candidatePassword, this.password);
    } else {
        // For existing unhashed passwords
        return this.password === candidatePassword;
    }
};

export default mongoose.model("user", userSchema);