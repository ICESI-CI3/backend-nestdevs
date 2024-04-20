import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import {v4 as uuid} from  'uuid';
import { Product } from "./model/product";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: uuid(),
            name: 'Barra de chocolate artesanal',
            description: 'Una deliciosa barra de chocolate artesanal elaborada con cacao de alta calidad y trozos de almendra tostada.',
            price: 5000
        },
        {
            id: uuid(),
            name: 'Gomitas de ositos surtidos',
            description: 'Una bolsa de gomitas de ositos surtidos en sabores de fresa, limón, naranja y cereza, perfectos para disfrutar como un dulce tentempié.',
            price: 500
        },
        {
            id: uuid(),
            name: 'Pastel de zanahoria',
            description: 'Un delicioso pastel de zanahoria con una suave crema de queso en la parte superior, ideal para satisfacer tus antojos de dulce con un toque de sabor a especias.',
            price: 8000
        }
    ];
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
