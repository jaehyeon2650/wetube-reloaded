import Video from "../models/video";
import User from "../models/user";
import Comment from "../models/comment";
export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
    console.log(videos);
    return res.render("home", { title: "Home", videos });
}
export const see = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id).populate("owner").populate("comments");

    if (!video) {
        return res.render("404", { title: "video not found!" })
    }
    res.render("videofile/watch", { title: video.title, video: video });
}
export const getedit = async (req, res) => {
    const {
        user: { _id },
    } = req.session
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { title: "video not found" });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    res.render("videofile/edit", { title: `Edit: ${video.title}`, video: video });
}
export const postedit = async (req, res) => {
    const id = req.params.id;
    const {
        user: { _id },
    } = req.session
    // const video = await Video.findById(id);
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.status(404).render("404", { title: "video not found" })
    }
    if (String(video.owner) !== String(_id)) {
        req.falsh("error", "You are not the owner of the video.")
        return res.status(403).redirect("/");
    }
    const { title, description, hashtags } = req.body;
    await Video.findByIdAndUpdate(id, {
        title: title,
        description: description,
        hashtags: Video.modelHashtag(hashtags),
    })
    // video.title = title;
    // video.description = description;
    // video.hashtags = hashtags.split(",").map(word => (word.startsWith("#") ? word : `#${word}`));
    // await video.save();
    req.flash("success", "Changes saved");
    return res.redirect(`/videos/${id}`);
}
export const remove = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { title: "Video not found" });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}
export const search = async (req, res) => {
    const { keyward } = req.query;
    let videos = [];
    if (keyward) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyward, "i"),
            }
        }).populate("owner")
    }
    return res.render("videofile/search", { title: "Search", videos: videos });
}
export const getupload = (req, res) => {
    return res.render("videofile/upload", { title: "upload" });
}
export const postupload = async (req, res) => {
    const { _id } = req.session.user;
    const { video, thumb } = req.files;
    // console.log(video, thumb);
    const { title, description, hashtags } = req.body;
    try {
        const newvideo = await Video.create({
            title: title,
            videoUrl: video[0].path,
            thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
            description: description,
            hashtags: Video.modelHashtag(hashtags),
            owner: _id,
        });
        const user = await User.findById(_id);
        user.videos.push(newvideo);
        user.save();
        return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.render("videofile/upload", { title: "Upload", message: error._message })
    }

}
export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    else {
        video.meta.views = video.meta.views + 1;
        await video.save();
        return res.sendStatus(200);
    }
}

export const postComment = async (req, res) => {
    const {
        body: { text },
        params: { id },
        session: { user },
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        user: user._id,
        video: id,
    })
    video.comments.push(comment._id);
    video.save();
    return res.status(201).json({ newCommentId: comment._id });
}

export const deleteComment = async (req, res) => {
    const comment_id = req.body.id;
    const comment = await Comment.findById(comment_id).populate("user").populate("video");
    const user = req.session.user;
    if (String(user._id) === String(comment.user._id)) {
        const video_id = String(comment.video._id);
        const video = await Video.findById(video_id);
        video.comments = video.comments.filter((element) => String(element) !== comment_id)
        await video.save();
        await Comment.findByIdAndDelete(comment_id);
        return res.sendStatus(201);
    }
    return res.sendStatus(404);
}