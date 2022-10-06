import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: "varchar",
        length: 50,
    })
    @Index()
    name: string;
}