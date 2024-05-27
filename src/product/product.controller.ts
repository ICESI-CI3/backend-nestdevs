import { Controller, Get, HttpCode, Post, Param, Body, Put, Delete, ParseUUIDPipe, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './product.service';
import { Product } from './model/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/role-auth.decorator';
import { UserRole } from '../user/entities/user.entity';

@Controller('products')
export class ProductController {

    constructor (
        private readonly productService: ProductsService
    ){}



    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
    @Get()
    findAll(): Promise<Product[]> { // Corregido: El tipo de retorno debe ser Promise<Product[]>
        return this.productService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        return await this.productService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER)
    @UsePipes(ValidationPipe)
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


    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
    @Get('category/:category')
    findProductsByCategory(category: string) {
        return this.productService.findProductsByCategory(category);
    }


    // Obtener todos los productos de un usuario
    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
    @Get('user/:userId')
    findProductsByUser(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.productService.findProductsByUser(userId);
    }
}
