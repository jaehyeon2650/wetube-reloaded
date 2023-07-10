import Video from "../models/video";
import User from "../models/user";
export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
    return res.render("home", { title: "Home", videos });
}
export const see = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id).populate("owner");

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
    return res.redirect(`/video/${id}`);
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
export const upload = (req, res) => {
    return res.send("upload video");
}
export const getupload = (req, res) => {
    return res.render("videofile/upload", { title: "upload" });
}
export const postupload = async (req, res) => {
    const { _id } = req.session.user;
    const file = req.file;
    const { title, description, hashtags } = req.body;
    try {
        const newvideo = await Video.create({
            title: title,
            videoUrl: file.path,
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