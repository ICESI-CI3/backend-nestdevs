
import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/model/product.entity";
import { Rating } from "../../rating/model/rating.entity";
import { AfterInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Product, product => product.user, {cascade:true})
    products: Product[];

    @OneToMany(() => Order, order => order.user, {cascade:true})
    orders: Order[];

    @OneToMany(() => Rating, rating => rating.seller, {cascade:true})
    ratings: Rating[];

    @OneToMany(() => Rating, rating => rating.author, {cascade:true})
    ratingsGiven: Rating[];

}

