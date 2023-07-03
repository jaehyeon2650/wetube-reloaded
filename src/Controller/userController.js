import User from "../models/user";
export const getJoin = (req, res) => {
    return res.render("join", { title: "Join" });
}
export const postJoin = async (req, res) => {
    const { email, username, password, name, location } = req.body;
    await User.create({
        email,
        username,
        password,
        name,
        location,
    })
    return res.redirect("/login");
}
export const edit = (req, res) => {
    return res.send("edit user");
}
export const remove = (req, res) => {
    return res.send("delete user");
}
export const login = (req, res) => {
    return res.send("login");
}
export const see = (req, res) => {
    return res.send("see");
}
export const logout = (req, res) => {
    return res.send("logout");
}