// product.module.ts

import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product';

@Module({
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductsService],
})
export class ProductModule {}
