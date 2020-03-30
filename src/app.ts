import express from "express";
import session from "express-session";
import "reflect-metadata";
import auth from "./auth";
import { connectDB } from "./db";
import { startServer } from "./server";

require("dotenv").config();

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        saveUninitialized: true,
        resave: true,
    })
);
app.use(auth.router);

app.get("/", auth.shibboleth, (_, res) => {
    res.send("Hello world!");
});

connectDB()
    .then((_) => startServer(app))
    .catch((err) => console.error(err));
