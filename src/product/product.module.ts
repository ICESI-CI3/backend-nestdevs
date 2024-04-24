// product.module.ts

import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { ConfigModule } from "@nestjs/config";
import { User } from "src/user/entities/user.entity";

@Module({
  controllers: [ProductController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product,User]),
  ],
  providers:[ProductsService],
  exports: [ProductsService],
})
export class ProductModule {}
