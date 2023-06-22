export const join = (req, res) => {
    return res.render("home");
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