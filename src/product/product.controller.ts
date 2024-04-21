import { Controller, Get, HttpCode, Post, Param, Body, Put, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './product.service';
import { Product } from './model/product';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/role-auth.decorator';
import { User, UserRole } from 'src/user/entities/user.entity';

@Controller('products')
export class ProductController {

    constructor (
        private readonly productService: ProductsService
    ){}


    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
    @Get()
    findAll() {
        return this.productService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Product {
        return this.productService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER)
    @Post()
    @HttpCode(201)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER)
    @Put(':id')
    update(@Req() req:any,@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(req,id, updateProductDto);
    }


    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER)
    @Delete(':id')
    delete(@Req() req:any, @Param('id', ParseUUIDPipe) id: string) {
        return this.productService.delete(req, id);
    }
}
