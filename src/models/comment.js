import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    video: { type: mongoose.Types.ObjectId, ref: "Video" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
})

const comment = mongoose.model("Comment", commentSchema);
export default comment;