import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product, ProductCategory } from './model/product.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('ProductsService', () => {
    let service: ProductsService;
    let productRepository: Repository<Product>;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: {
                        find: jest.fn(),
                        findOneBy: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOneBy: jest.fn().mockResolvedValue({ id: 'user3', email: 'user3@example.com' }),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('test_findAll_returns_all_products_with_users', async () => {
        const expectedProducts: Product[] = [
            { id: '1', name: 'Product 1', description: 'Description 1', price: 10, category: ProductCategory.FOOD, sellerId: 'user1', user: null, orderItem: [] },
            { id: '2', name: 'Product 2', description: 'Description 2', price: 20, category: ProductCategory.BOOKS, sellerId: 'user2', user: null, orderItem: [] },
        ];
        jest.spyOn(productRepository, 'find').mockResolvedValue(expectedProducts);
        const products = await service.findAll();
        expect(products).toEqual(expectedProducts);
        expect(productRepository.find).toHaveBeenCalledWith({
            relations: {
                user: true,
            },
        });
    });
    it('test_create_handles_database_errors_gracefully', async () => {
        jest.spyOn(productRepository, 'save').mockRejectedValue({ code: '23505' });
        await expect(service.create({ name: 'New Product', description: 'Description', price: 100, category: ProductCategory.FOOD, sellerId: 'user4' }))
            .rejects.toThrow(InternalServerErrorException);
    });
});