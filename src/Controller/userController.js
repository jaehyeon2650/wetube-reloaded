import User from "../models/user";
import bcrypt from "bcrypt";
export const getJoin = (req, res) => {
    return res.render("join", { title: "Join" });
}
export const postJoin = async (req, res) => {
    const { email, username, password, checkpassword, name, location } = req.body;
    const user = await User.exists({ $or: [{ username }, { email }] });
    if (password !== checkpassword) {
        return res.status(400).render("join", { title: "Join", errorMessage: "Please, check password" });
    }
    if (user) {
        return res.status(400).render("join", { title: "Join", errorMessage: "Already exist username or email" })
    }
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
export const getLogin = (req, res) => {
    return res.render("login", { title: "Login" });
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", { title: "Login", errorMessage: "Account with this username does not exist" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { title: "Login", errorMessage: "Wrong password" });
    }
    req.session.login = true;
    req.session.user = user;
    return res.redirect("/");
}
export const see = (req, res) => {
    return res.send("see");
}
export const logout = (req, res) => {
    return res.send("logout");
}