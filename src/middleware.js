import multer from "multer";
import multers3 from "multer-s3";
// import { S3Client } from "@aws-sdk/client-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

// const isHeroku = process.env.NODE_ENV === "production";
const s3imageUploader = multers3({
    s3: s3,
    bucket: "wetubejaehyeon",
    acl: "public-read",
})
const s3videoUploader = multers3({
    s3: s3,
    bucket: "wetubejaehyeon",
    acl: "public-read",
})
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
        req.flash("error", "Log in first");
        return res.redirect("/login")
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.login) {
        return next();
    }
    else {
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
}

export const uploadAvatar = multer({
    dest: "uploads/avatar",
    limits: {
        fileSize: 300000000000,
    },
    storage: s3imageUploader,
})
export const uploadVideo = multer({
    dest: "uploads/videos", limits: {
        fileSize: 10000000000000,
    },
    storage: s3videoUploader,
})