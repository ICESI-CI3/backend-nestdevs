import * as Faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './model/product.entity';
import { User } from '../user/entities/user.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const fakeProduct: CreateProductDto = {
        name: Faker.commerce.productName(),
        category: Faker.commerce.department(),
        description: Faker.lorem.paragraph(),
        price: parseFloat(Faker.commerce.price()),
        sellerId: Faker.datatype.uuid(),
        image: ''
      };

      const createdProduct: Product = {
        id: Faker.datatype.uuid(),
        ...fakeProduct,
        user: new User(),
        orderItem: []
      };

      jest.spyOn(productService, 'create').mockResolvedValue(createdProduct);

      expect(await controller.create(fakeProduct)).toBe(createdProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [
        {
          id: Faker.datatype.uuid(),
          name: Faker.commerce.productName(),
          category: Faker.commerce.department(),
          description: Faker.lorem.paragraph(),
          price: parseFloat(Faker.commerce.price()),
          sellerId: Faker.datatype.uuid(),
          user: new User(),
          orderItem: [],
          image: ''
        },
        {
          id: Faker.datatype.uuid(),
          name: Faker.commerce.productName(),
          category: Faker.commerce.department(),
          description: Faker.lorem.paragraph(),
          price: parseFloat(Faker.commerce.price()),
          sellerId: Faker.datatype.uuid(),
          user: new User(),
          orderItem: [],
          image: ''
        }
      ];
      jest.spyOn(productService, 'findAll').mockResolvedValue(products);

      expect(await controller.findAll()).toBe(products);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const productId = Faker.datatype.uuid();
      const product: Product = {
        id: productId,
        name: Faker.commerce.productName(),
        category: Faker.commerce.department(),
        description: Faker.lorem.paragraph(),
        price: parseFloat(Faker.commerce.price()),
        sellerId: Faker.datatype.uuid(),
        user: new User(),
        orderItem: [],
        image: ''
      };
      jest.spyOn(productService, 'findOneById').mockResolvedValue(product);

      expect(await controller.findOne(productId)).toBe(product);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productId = Faker.datatype.uuid();
      const updateProductDto: UpdateProductDto = {
        name: Faker.commerce.productName(),
        description: Faker.lorem.paragraph(),
        price: parseFloat(Faker.commerce.price()),
        sellerId: Faker.datatype.uuid(),
      };
      const updatedProduct: Product = {
        id: Faker.datatype.uuid(),
        name: Faker.commerce.productName(),
        category: Faker.commerce.department(),
        description: Faker.lorem.paragraph(),
        price: parseFloat(Faker.commerce.price()),
        sellerId: Faker.datatype.uuid(),
        user: new User(),
        orderItem: [],
        image: ''
      };
      
      
      jest.spyOn(productService, 'update').mockResolvedValue(updatedProduct);

      expect(await controller.update({}, productId, updateProductDto)).toBe(updatedProduct);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const productId = Faker.datatype.uuid();
      const deletedProduct: Product = {
        id: productId,
        name: '',
        category: Faker.commerce.department(),
        description: '',
        price: 0,
        sellerId: '',
        user: new User(),
        orderItem: [],
        image: ''
      };
  
      jest.spyOn(productService, 'delete').mockResolvedValue(deletedProduct); 
  
      expect(await controller.delete({}, productId)).toEqual(deletedProduct);
    });
  });

});
