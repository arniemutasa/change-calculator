import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Float {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 0 })
    '50R': number;

    @Column({ type: 'int', default: 0 })
    '20R': number;

    @Column({ type: 'int', default: 0 })
    '10R': number;

    @Column({ type: 'int', default: 0 })
    '5R': number;

    @Column({ type: 'int', default: 0 })
    '1R': number;

    @Column({ type: 'int', default: 0 })
    '50c': number;

    @Column({ type: 'int', default: 0 })
    '20c': number;

    @Column({ type: 'int', default: 0 })
    '10c': number;

    @Column({ type: 'int', default: 0 })
    '5c': number;

}