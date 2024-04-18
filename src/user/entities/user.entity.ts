import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    role: UserRole;
    @Column('text',
            {unique: true})
    slug: string;
    @Column('timestamp',
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;
}