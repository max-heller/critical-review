import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Department from "./department";
import Review from "./review";
import Section from "./section";

@Entity()
export default class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne((_) => Department, (department) => department.courses)
    department!: Department;

    @Column({ length: 5 })
    code!: string;

    @Column()
    name!: string;

    @OneToMany((_) => Section, (section) => section.course)
    sections!: Section[];

    @ManyToMany((_) => Review, (review) => review.recommendedCourses)
    @JoinTable()
    recommendedBy!: Review[];
}
