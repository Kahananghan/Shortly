import mongoose from "mongoose";

const shorturlschema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
});

const Shorturl = mongoose.model('Shorturl', shorturlschema);
export default Shorturl