import { createConnection } from "typeorm";
import Course from "./models/course";
import Department from "./models/department";
import Professor from "./models/professor";
import Review from "./models/review";
import Section from "./models/section";
import Staff from "./models/staff";

require("dotenv").config();

export function connectDB() {
    return createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Course, Department, Professor, Review, Section, Staff],
        synchronize: true,
        dropSchema: true,
        logging: false,
    });
}
