import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    contents!: string;
}
