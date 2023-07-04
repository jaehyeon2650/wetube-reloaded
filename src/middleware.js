export const localsMiddleware = (req, res, next) => {
    res.locals.login = req.session.login;
    res.locals.user = req.session.user;
    console.log(res.locals);
    res.locals.siteName = "Wetube";
    next();
}