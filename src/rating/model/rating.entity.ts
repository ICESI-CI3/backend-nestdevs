import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    description: string;

    @Column('integer')
    stars : number;

    @Column('uuid', {name: 'seller_id'})
    sellerId: string;

    @Column('uuid', {name: 'author_id'})
    authorId: string;

    @ManyToOne(() => User, user => user.ratings)
    @JoinColumn({name: 'seller_id'})
    seller: User;

    @ManyToOne(() => User, user => user.ratingsGiven)
    @JoinColumn({name: 'author_id'})
    author: User;


}