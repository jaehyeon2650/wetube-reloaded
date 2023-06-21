export const trending = (req, res) => {
    return res.send("trend video");
}
export const see = (req, res) => {
    console.log(req.params);
    return res.send("watch video");
}
export const edit = (req, res) => {
    return res.send("edit video");
}
export const remove = (req, res) => {
    return res.send("delete video");
}
export const search = (req, res) => {
    return res.send("seach video");
}
export const upload = (req, res) => {
    return res.send("upload video");
}