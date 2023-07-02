import Video from "../models/video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    console.log(videos);
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
        return res.render("404", { title: "video not found" });
    }
    res.render("edit", { title: `Edit: ${video.title}`, video: video });
}
export const postedit = async (req, res) => {
    const id = req.params.id;
    // const video = await Video.findById(id);
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.render("404", { title: "video not found" })
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
export const remove = (req, res) => {
    return res.send(`delete video #${req.params.id}`);
}
export const search = (req, res) => {
    return res.send("seach video");
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