import bodyParser from "body-parser";
import dotenv from "dotenv";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

dotenv.config();

const Strategy = require("brown-shib").default;
const shibbolethStrategy = new Strategy({
    host: process.env.HOST_URL,
    cbPath: "/login/callback",
    privateKeyPath:
        process.env.HOSTNAME == "localhost" ? null : process.env.KEY_PATH,
    issuer: process.env.HOST_SHIB_PATH,
});

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(passport.initialize());
router.use(passport.session());

router.get("/login", passport.authenticate("shibboleth"));

router.post("/login/callback", (req, res, next) => {
    passport.authenticate("shibboleth", {
        successRedirect: req.session!.postAuthTarget || "/",
        failureRedirect: "/",
    })(req, res, next);
    delete req.session!.postAuthTarget;
});

passport.use("shibboleth", shibbolethStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

function shibAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated() && "brownId" in req.user!) {
        next();
    } else {
        req.session!.postAuthTarget = req.originalUrl;
        res.redirect("/login");
    }
}

export default { router, shibboleth: shibAuth };
