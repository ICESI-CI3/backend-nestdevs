import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import {v4 as uuid} from  'uuid';
import { Product } from "./model/product";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    findAll(): Product[] {
        return this.products;
    }

    findOneById(id: string): Product {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    create(createProductDto: CreateProductDto): Product {
        const product: Product = {
            id: uuid(),
            ...createProductDto
        };
        this.products.push(product);
        return product;
    }

    update(id: string, updateProductDto: UpdateProductDto): Product {
        let product = this.findOneById(id);
        if (updateProductDto.id && updateProductDto.id !== id) {
            throw new NotFoundException(`Invalid product id: ${updateProductDto.id}`);
        }
        product = {
            ...product,
            ...updateProductDto
        };
        this.products = this.products.map(p => p.id === id ? product : p);
        return product;
    }

    delete(id: string): Product {
        const product = this.findOneById(id);
        this.products = this.products.filter(p => p.id !== product.id);
        return product;
    }
}
