// product.module.ts

import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [ProductController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers:[ProductsService],
  exports: [ProductsService],
})
export class ProductModule {}
