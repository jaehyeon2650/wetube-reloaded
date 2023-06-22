
const videos = [
    {
        title: "frist video",
        ratio: 5,
        comments: 20,
        createdat: "2 years ago",
        views: 1,
        id: 1,
    },
    {
        title: "second video",
        ratio: 5,
        comments: 20,
        createdat: "2 years ago",
        views: 55,
        id: 2,
    },
    {
        title: "third video",
        ratio: 5,
        comments: 20,
        createdat: "2 years ago",
        views: 55,
        id: 3,
    }
]
export const trending = (req, res) => {
    return res.render("home", { title: "Home", videos: videos });
}
export const see = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    res.render("watch", { title: "Watch " + video.title, video });
}
export const getedit = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    res.render("edit", { title: "Edit " + video.title, video });
}
export const postedit = (req, res) => {
    const id = req.params.id;
    videos[id - 1].title = req.body.title
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
export const postupload = (req, res) => {
    const newvideo = {
        title: req.body.title,
        ratio: 0,
        comments: 0,
        createdat: "just now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(newvideo);
    return res.redirect("/");
}