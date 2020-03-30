import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import Course from "./course";
import Section from "./section";
import Staff from "./staff";

// TODO: figure out revision history
// TODO: rank 1-5 questions (readings worthwhile, etc.)
// TODO: course format (lecture, seminar), observed reading period?

@Entity()
export default class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne((_) => Section, (section) => section.review)
    @JoinColumn()
    section!: Section;

    @Column({ default: false })
    published!: boolean;

    @Column("smallint")
    respondents!: number;

    @Column("smallint")
    freshmen!: number;

    @Column("smallint")
    sophomores!: number;

    @Column("smallint")
    juniors!: number;

    @Column("smallint")
    seniors!: number;

    @Column("smallint")
    grads!: number;

    // TODO: is this needed?
    @Column("smallint")
    total!: number;

    @Column("smallint")
    concentrators!: number;

    @Column("smallint")
    nonconcentrators!: number;

    @Column("smallint")
    undecided!: number;

    @Column("numeric", { precision: 3, scale: 2 })
    professorScore!: number;

    @Column("numeric", { precision: 3, scale: 2 })
    courseScore!: number;

    @Column()
    contents!: string;

    @Column("float")
    avgTimeCommitment!: number;

    @Column("float")
    maxTimeCommitment!: number;

    @ManyToMany((_) => Course, (course) => course.recommendedBy)
    recommendedCourses!: Course[];

    @ManyToOne((_) => Staff, (staff) => staff.reviewsWritten)
    writer!: Staff;

    @ManyToOne((_) => Staff, (staff) => staff.reviewsEdited)
    editor!: Staff;

    @ManyToMany((_) => Staff, (staff) => staff.reviewsReviewed)
    execs!: Staff[];

    @Column({ nullable: true })
    editorComments?: string;

    @Column({ nullable: true })
    editorSignatures?: string;

    @Column({ nullable: true })
    barcodeId?: number;

    // TODO: make sure this auto-updates on edit
    @Column("timestamp")
    timestamp!: Date;
}
