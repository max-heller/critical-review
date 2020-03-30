import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Course from "./course";

@Entity()
export default class Department extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 4 })
    code!: string;

    @Column()
    name!: string;

    @OneToMany((_) => Course, (course) => course.department)
    courses!: Course[];
}
