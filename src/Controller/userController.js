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
export const getEdit = (req, res) => {
    return res.render("edit-profile", { title: "Edit Profile" });
}
export const postEdit = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { username, name, email, location },
    } = req;
    if (email !== req.session.user.email) {
        const existuser = await User.exists({ email });
        if (existuser) {
            return res.render("edit-profile", { title: "Edit-Profile", errorMessage: "Email already exist" })
        }
    }
    else if (username !== req.session.user.username) {
        const existuser = await User.exists({ username });
        if (existuser) {
            return res.render("edit-profile", { title: "Edit-Profile", errorMessage: "Username already exist" })
        }
    }
    const newUser = await User.findByIdAndUpdate(_id, {
        name,
        username,
        email,
        location,
    }, { new: true })
    req.session.user = newUser;
    return res.redirect("/users/edit");
}
export const getLogin = (req, res) => {
    return res.render("login", { title: "Login" });
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, githublogin: false });
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
export const getGithubStart = (req, res) => {
    const url = "https://github.com/login/oauth/authorize"
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    }
    const param = new URLSearchParams(config).toString();
    const finalurl = `${url}?${param}`;
    return res.redirect(finalurl);
}
export const postGithubFinish = async (req, res) => {
    const baseurl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    }
    const param = new URLSearchParams(config).toString();
    const finalurl = `${baseurl}?${param}`;
    const data = await (await fetch(finalurl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        }
    })).json();
    if ("access_token" in data) {
        const access_token = data.access_token;
        const apiurl = "https://api.github.com";
        const userData = await (await fetch(`${apiurl}/user`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })).json();
        const emailData = await (await fetch(`${apiurl}/user/emails`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })).json();
        const userEmail = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!userEmail) {
            return res.redirect("/login");
        }
        let existUser = await User.findOne({ email: userEmail.email });
        if (!existUser) {
            existUser = await User.create({
                email: userEmail.email,
                username: userData.login,
                password: "",
                githublogin: true,
                name: userData.name,
                location: userData.location,
                avatar_url: userData.avatar_url,
            })
        }
        else {
            req.session.login = true;
            req.session.user = existUser;
            return res.redirect("/");
        }
    }
    else {
        return res.redirect("/login");
    }

}
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}