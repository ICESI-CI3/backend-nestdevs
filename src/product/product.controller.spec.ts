import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './model/product';

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

  describe('findAll', () => {
    it('should return an array of products', () => {
      const candyProducts: Product[] = [
        { id: '1', name: 'Chocolate', description: 'Delicious chocolate bar', price: 2 },
        { id: '2', name: 'Gummy Bears', description: 'Sweet and chewy gummy bears', price: 1 },
      ];
      jest.spyOn(productService, 'findAll').mockReturnValue(candyProducts);

      expect(controller.findAll()).toEqual(candyProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', () => {
      const chocolate: Product = { id: '1', name: 'Chocolate', description: 'Delicious chocolate bar', price: 2 };
      jest.spyOn(productService, 'findOneById').mockReturnValue(chocolate);

      expect(controller.findOne('1')).toEqual(chocolate);
    });
  });

  describe('create', () => {
    it('should create a new product', () => {
      const newCandy: CreateProductDto = { name: 'Jelly Beans', description: 'Assorted flavored jelly beans', price: 3 };
      const createdCandy: Product = { id: '1', ...newCandy };
      jest.spyOn(productService, 'create').mockReturnValue(createdCandy);

      expect(controller.create(newCandy)).toEqual(createdCandy);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const updatedCandy: UpdateProductDto = { name: 'Gummy Worms', description: 'Juicy and flavorful gummy worms', price: 2 };
      const existingCandy: Product = { id: '1', name: 'Gummy Bears', description: 'Sweet and chewy gummy bears', price: 1 };
      jest.spyOn(productService, 'update').mockReturnValue(existingCandy);

      expect(controller.update('1', updatedCandy)).toEqual(existingCandy);
    });
  });

  describe('delete', () => {
    it('should delete a product', () => {
      const gummyBears: Product = { id: '1', name: 'Gummy Bears', description: 'Sweet and chewy gummy bears', price: 1 };
      jest.spyOn(productService, 'delete').mockReturnValue(gummyBears);

      expect(controller.delete('1')).toEqual(gummyBears);
    });
  });
});
