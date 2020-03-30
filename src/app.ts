import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { readFileSync as readFile } from "fs";
import https from "https";
import "reflect-metadata";
import auth from "./auth";
import { db } from "./db";

dotenv.config();

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

let keys;
if (process.env.MODE == "development") {
    const generated = require("selfsigned").generate();
    keys = { key: generated.private, cert: generated.cert };
} else {
    keys = { key: readFile("key.pem"), cert: readFile("cert.pem") };
}
const server = https.createServer(keys, app);
const port = process.env.HOSTNAME == "localhost" ? 8443 : 443;
db.then((_) => {
    server.listen(port, () => console.log(`server is listening on ${port}`));
}).catch((err) => console.error(err));
