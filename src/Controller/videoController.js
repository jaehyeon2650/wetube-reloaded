import Video from "../models/video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", { title: "Home", videos });
}
export const see = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    res.render("watch", { title: video.title, video: video });
}
export const getedit = (req, res) => {
    const id = req.params.id;
    res.render("edit", { title: "Edit " });
}
export const postedit = (req, res) => {
    const id = req.params.id;
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
            hashtags: hashtags.split(",").map(word => `#${word}`),
        });
        return res.redirect("/");

    } catch (error) {
        console.log(error);
        return res.render("upload", { title: "Upload", message: error._message })
    }

}