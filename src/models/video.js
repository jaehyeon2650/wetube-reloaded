import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    videoUrl: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true, minLength: 2 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
})

//middleware
// videoSchema.pre("save", async function () {
//     this.hashtags = this.hashtags[0].split(",").map(word => (word.startsWith("#") ? word : `#${word}`));
// })
//static
videoSchema.static("modelHashtag", function (hashtags) {
    return hashtags.split(",").map(word => (word.startsWith("#") ? word : `#${word}`));
})
const Video = mongoose.model("Video", videoSchema);
export default Video;