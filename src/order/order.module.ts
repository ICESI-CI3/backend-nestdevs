import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { Order } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [OrderController],
  imports: [
    ProductModule,
    ConfigModule,
    TypeOrmModule.forFeature([Order,OrderItem]),
  ],
  providers: [OrderService],
})
export class OrderModule {}
