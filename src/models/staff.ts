import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Review from "./review";

@Entity()
export default class Staff extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    username!: string;

    @Column({ length: 100 })
    passwordHash!: string;

    @Column({ length: 100 })
    email!: string;

    @Column({ length: 50 })
    name!: string;

    @Column("numeric", { precision: 4, scale: 1 })
    graduationYear!: number;

    @Column("numeric", { precision: 1, scale: 0 })
    level!: number;

    @Column({ nullable: true })
    bio?: string;

    @Column({ length: 20, nullable: true })
    phoneNumber?: string;

    @Column("numeric", { precision: 4, scale: 0, nullable: true })
    brownMailbox?: number;

    @Column({ length: 100, nullable: true })
    imageUrl?: string;

    @OneToMany((_) => Review, (review) => review.writer)
    reviewsWritten!: Review[];

    @OneToMany((_) => Review, (review) => review.editor)
    reviewsEdited!: Review[];

    @ManyToMany((_) => Review, (review) => review.execs)
    @JoinTable()
    reviewsReviewed!: Review[];
}
