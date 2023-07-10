import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.login = req.session.login;
    res.locals.user = req.session.user || {};
    res.locals.siteName = "Wetube";
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.login) {
        return next();
    }
    else {
        return res.redirect("/login")
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.login) {
        return next();
    }
    else {
        return res.redirect("/");
    }
}

export const uploadAvatar = multer({
    dest: "uploads/avatar", limits: {
        fileSize: 3000000,
    }
})
export const uploadVideo = multer({
    dest: "uploads/videos", limits: {
        fileSize: 10000000000000,
    }
})