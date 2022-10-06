import { User } from "@src/modules/users/users.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";

@Entity('attachments')
export class Attachment {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column({
        type: "varchar",
        length: 32,
    })
    filename: string;

    @Column({
        type: "varchar",
        length: 200,
    })
    url: string;
}