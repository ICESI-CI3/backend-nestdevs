import { Controller, Get, HttpCode, Post, Param, Body, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './product.service';
import { Product } from './model/product';

@Controller('products')
export class ProductController {

    constructor (
        private readonly productService: ProductsService
    ){}

    @Get()
    findAll(): Product[] {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Product {
        return this.productService.findOneById(id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() createProductDto: CreateProductDto): Product {
        return this.productService.create(createProductDto);
    }

    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto): Product {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string): Product {
        return this.productService.delete(id);
    }
}
