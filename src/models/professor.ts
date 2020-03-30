import {
    BaseEntity,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Section from "./section";

@Entity()
export default class Professor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToMany((_) => Section, (section) => section.professors)
    @JoinTable()
    sections!: Section[];
}
