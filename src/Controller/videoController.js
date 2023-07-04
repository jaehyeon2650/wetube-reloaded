import Video from "../models/video";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { title: "Home", videos });
}
export const see = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { title: "video not found!" })
    }
    res.render("watch", { title: video.title, video: video });
}
export const getedit = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { title: "video not found" });
    }
    res.render("edit", { title: `Edit: ${video.title}`, video: video });
}
export const postedit = async (req, res) => {
    const id = req.params.id;
    // const video = await Video.findById(id);
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.status(404).render("404", { title: "video not found" })
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
        })
    }
    return res.render("search", { title: "Search", videos: videos });
}
export const upload = (req, res) => {
    return res.send("upload video");
}
export const getupload = (req, res) => {
    return res.render("upload", { title: "upload" });
}
export const postupload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title: title,
            description: description,
            hashtags: Video.modelHashtag(hashtags),
        });
        return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.render("upload", { title: "Upload", message: error._message })
    }

}