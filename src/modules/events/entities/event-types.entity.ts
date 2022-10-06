import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('event_types')
export class EventType {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: "varchar",
        length: 50,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 10,
        nullable: true,
    })
    color: string;

    @Column({
        type: "varchar",
        length: 2000,
        nullable: true,
    })
    template: string;
}