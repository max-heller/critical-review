import { Application } from "express";
import { readFileSync as readFile } from "fs";
import https from "https";

require("dotenv").config();

let keys: { key: Buffer; cert: Buffer };
if (process.env.MODE == "development") {
    const generated = require("selfsigned").generate();
    keys = { key: generated.private, cert: generated.cert };
} else {
    keys = { key: readFile("key.pem"), cert: readFile("cert.pem") };
}
const port = process.env.HOSTNAME == "localhost" ? 8443 : 443;

export async function startServer(app: Application) {
    https.createServer(keys, app).listen(port, () => {
        console.log(`server is listening on ${port}`);
    });
}
