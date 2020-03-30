import { createConnection } from "typeorm";
import Review from "./models/review";

export const db = createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Review],
    synchronize: true,
    logging: false,
});
