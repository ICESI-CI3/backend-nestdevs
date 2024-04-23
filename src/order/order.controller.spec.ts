import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { UpdateOrderItemDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { User, UserRole } from '../user/entities/user.entity';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as faker from 'faker';

class MockOrderService {
  createOrder(createOrderDto: CreateOrderDto) {}
  createOrderItem(id: string, createOrderItemDto: CreateOrderItemDto) {}
  findAll() {}
  findOne(id: string) {}
  update(req: any, id: string, updateOrderItemDto: UpdateOrderItemDto) {}
  removeOrder(req: any, id: string) {}
  removeOrderItem(req: any, id: string) {}
}

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useClass: MockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const createOrderDto: CreateOrderDto = {
      orderDate: new Date(),
      id: faker.datatype.uuid(),
      items: [{ 
        productId: faker.datatype.uuid(),
        orderId: faker.datatype.uuid(),
        quantity: faker.datatype.number(10)
      }]
    };

    const result: Order = {
      id: faker.datatype.uuid(),
      createdAt: Date.now(),
      buyerId: faker.datatype.uuid(),
      user: { 
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [UserRole.BUYER],
        createdAt: Date.now(),
        products: [],
        orders: [],
        ratings: [],
        ratingsGiven: []
      },
      items: []
    };

    jest.spyOn(orderService, 'createOrder').mockResolvedValue(result);

    expect(await controller.create(createOrderDto)).toBe(result);
  });

  it('should create an order item', async () => {
    const orderId = faker.datatype.uuid();
    const createOrderItemDto: CreateOrderItemDto = {
      productId: faker.datatype.uuid(),
      orderId: orderId,
      quantity: faker.datatype.number(10)
    };

    const result: OrderItem = {
      id: faker.datatype.uuid(),
      orderId: orderId,
      order: {
        id: faker.datatype.uuid(),
        createdAt: Date.now(),
        buyerId: faker.datatype.uuid(),
        user: { 
          id: faker.datatype.uuid(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roles: [UserRole.BUYER],
          createdAt: Date.now(),
          products: [],
          orders: [],
          ratings: [],
          ratingsGiven: []
        },
        items: []
      },
      productId: faker.datatype.uuid(),
      product: {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.datatype.number(),
        sellerId: faker.datatype.uuid(),
        user: { 
          id: faker.datatype.uuid(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roles: [UserRole.SELLER],
          createdAt: Date.now(),
          products: [],
          orders: [],
          ratings: [],
          ratingsGiven: []
        },
        orderItem: []
      },
      quantity: faker.datatype.number(10)
    };

    jest.spyOn(orderService, 'createOrderItem').mockResolvedValue(result);

    expect(await controller.createOrderItem(orderId, createOrderItemDto)).toBe(result);
  });
});
