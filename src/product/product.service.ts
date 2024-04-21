import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { Product } from "./model/product";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    private readonly logger = new Logger('ProductsService');
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ){}
    
    async findAll() {
        return await this.productsRepository.find({
            relations : {
                user: true,
            }
        })
    }

    findOneById(id: string) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto) {
        const product = this.productsRepository.create(createProductDto);
        return await this.productsRepository.save(product);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.preload({
            id: id,
            ...updateProductDto
        });
      
        if ( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);
    
        try {
            await this.productsRepository.save( product );
            return product;
        
        } catch (error) {
            this.handleDBExceptions(error);
        }
        return `This action updates a #${id} product`;

    }
    private handleDBExceptions( error: any ) {

        if ( error.code === '23505' )
          throw new BadRequestException(error.detail);
        
        this.logger.error(error)
        // console.log(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    
      }

    async delete(id: string) {
        const user = await this.findOne(id)
        return await this.productsRepository.remove(user);
    }
    findOne(id: string) {
        return this.productsRepository.findOneBy({id:id});
    }
}
