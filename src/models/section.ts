import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import Course from "./course";
import Professor from "./professor";
import Review from "./review";

export enum Semester {
    Fall = "fall",
    Spring = "spring",
}

@Entity()
export default class Section extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // TODO: try making index
    @Column("smallint")
    year!: number;

    // TODO: try making index
    @Column("enum", { enum: Semester })
    semester!: Semester;

    @ManyToOne((_) => Course, (course) => course.sections)
    course!: Course;

    @Column("smallint")
    number!: number;

    @Column("smallint")
    crn!: number;

    @ManyToMany((_) => Professor, (professor) => professor.sections)
    professors!: Professor[];

    @OneToOne((_) => Review, (review) => review.section)
    review!: Review;
}
