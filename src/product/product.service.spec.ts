import { ProductsService } from './product.service';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  describe('findAll', () => {
    it('should return an empty array if no products are present', () => {
      const products = service.findAll();
      expect(products).toEqual([]);
    });

    it('should return all products', () => {
      const product1: CreateProductDto = { name: 'Product 1', description: 'Description 1', price: 10 };
      const product2: CreateProductDto = { name: 'Product 2', description: 'Description 2', price: 20 };
      service.create(product1);
      service.create(product2);

      const products = service.findAll();
      expect(products.length).toEqual(2);
      expect(products[0].name).toEqual(product1.name);
      expect(products[0].description).toEqual(product1.description);
      expect(products[0].price).toEqual(product1.price);
      expect(products[1].name).toEqual(product2.name);
      expect(products[1].description).toEqual(product2.description);
      expect(products[1].price).toEqual(product2.price);
    });
  });

  describe('findOneById', () => {
    it('should throw NotFoundException if product is not found', () => {
      expect(() => service.findOneById('invalid_id')).toThrowError(NotFoundException);
    });

    it('should return the product if it exists', () => {
      const product: CreateProductDto = { name: 'Product 1', description: 'Description 1', price: 10 };
      const createdProduct = service.create(product);

      const foundProduct = service.findOneById(createdProduct.id);
      expect(foundProduct).toEqual(createdProduct);
    });
  });

  describe('create', () => {
    it('should create a new product', () => {
      const createProductDto: CreateProductDto = { name: 'Product 1', description: 'Description 1', price: 10 };
      const product = service.create(createProductDto);
      expect(product.name).toEqual(createProductDto.name);
      expect(product.description).toEqual(createProductDto.description);
      expect(product.price).toEqual(createProductDto.price);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const createProductDto: CreateProductDto = { name: 'Product 1', description: 'Description 1', price: 10 };
      const createdProduct = service.create(createProductDto);
      const updateProductDto: UpdateProductDto = { name: 'Updated Product', description: 'Updated Description', price: 20 };
      const updatedProduct = service.update(createdProduct.id, updateProductDto);
      expect(updatedProduct.name).toEqual(updateProductDto.name);
      expect(updatedProduct.description).toEqual(updateProductDto.description);
      expect(updatedProduct.price).toEqual(updateProductDto.price);
    });

    it('should throw NotFoundException if product does not exist', () => {
      const updateProductDto: UpdateProductDto = { name: 'Updated Product', description: 'Updated Description', price: 20 };
      expect(() => service.update('invalid_id', updateProductDto)).toThrowError(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a product', () => {
      const createProductDto: CreateProductDto = { name: 'Product 1', description: 'Description 1', price: 10 };
      const product = service.create(createProductDto);
      const deletedProduct = service.delete(product.id);
      expect(deletedProduct).toEqual(product);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.delete('invalid_id')).toThrowError(NotFoundException);
    });
  });
});
