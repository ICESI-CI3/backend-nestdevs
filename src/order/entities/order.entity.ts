import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, Timestamp } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp',
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: number;

  @Column({name: 'buyer_id'})
  buyerId: string;

  @ManyToOne(() => User, user=> user.orders)
  @JoinColumn ({name : 'buyer_id'})
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade:true})
  items: OrderItem[];
}
