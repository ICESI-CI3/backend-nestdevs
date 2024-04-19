import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    BUYER = 'buyer'
}
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text',
            {unique: true})
    email: string;
    @Column('text')
    password: string;
    @Column('text',{array: true })
    roles: UserRole[];

    @Column('timestamp',
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;
}