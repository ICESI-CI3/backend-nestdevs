import { OrderItem } from "../../order/entities/orderItem.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum ProductCategory {
    FOOD = 'food',
    BOOKS = 'books',
    ELECTRONICS = 'electronics',
    FASHION = 'fashion',
    SPORTS = 'sports',
    OTHER = 'other'
}
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: ProductCategory,
        default: ProductCategory.OTHER
    })
    category: ProductCategory;

    @Column('decimal', { precision: 6, scale: 0 })
    price: number;
    
    @Column( {name : 'seller_id'})
    sellerId : string;

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn({name : 'seller_id'})
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {cascade:true})
    orderItem: OrderItem[];
    
}

