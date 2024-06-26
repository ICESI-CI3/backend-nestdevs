import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger, UnauthorizedException } from '@nestjs/common';
import { Product, ProductCategory } from "./model/product.entity";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User, UserRole } from '../user/entities/user.entity';

@Injectable()
export class ProductsService {


    private products: Product[] = [];
    private readonly logger = new Logger('ProductsService');
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}
    
    async findAll() {
        return await this.productsRepository.find({
            relations : {
                user: true,
            }
        })
    }

    async findOneById(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id }, 
        });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    

    findProductsByCategory(category: string) {
        try{
            return this.productsRepository.findBy({category:ProductCategory[category]});
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async create(createProductDto: CreateProductDto) {
        
        try{
            const user = await this.userRepository.findOneBy({id:createProductDto.sellerId});

            if ( !user ) throw new NotFoundException(`User with id: ${ createProductDto.sellerId } not found`);
    
            const product = this.productsRepository.create(createProductDto);

            return await this.productsRepository.save(product);
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async update(req:any, id: string, updateProductDto: UpdateProductDto) {
        const user = req.user as User;
        const product: Product = await this.productsRepository.findOneBy({id:id})
        if (product.sellerId==user.id||user.roles.includes(UserRole.ADMIN)){
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
        }else{
            throw new UnauthorizedException;
        }
    }
    handleDBExceptions(error: any) {
        if (error.code === '23505') {
            throw new InternalServerErrorException(error.detail);
        } else {
            throw new BadRequestException(error.detail); 
        }
    }

    async delete(req: any, id: string) {
        const user = req.user as User;
        const product: Product = await this.productsRepository.findOneBy({id:id})
        if (product.sellerId==user.id||user.roles.includes(UserRole.ADMIN)){
            const user = await this.findOne(id)
            return await this.productsRepository.remove(user);
        }else{
            throw new UnauthorizedException;
        }
    }
    async findOne(id: string) {
        return await this.productsRepository.findOneBy({id:id});
    }

    findProductsByUser(userId: string) {
        try{
            return this.productsRepository.findBy({sellerId:userId});
        }catch(error){
            this.handleDBExceptions(error);
        }
    }
}
