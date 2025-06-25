import mongoose from "mongoose";

const shorturlschema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true,
        trim: true
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2592000 // 30 days TTL for anonymous URLs
    }
}, {
    timestamps: true
});

const Shorturl = mongoose.model('Shorturl', shorturlschema);
export default Shorturl