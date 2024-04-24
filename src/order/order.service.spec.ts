import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: Repository<Order>;
  let orderItemRepo: Repository<OrderItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderItemRepo = module.get<Repository<OrderItem>>(getRepositoryToken(OrderItem));
  });

  it('test_create_order_success', async () => {
    const createOrderDto: CreateOrderDto = {
      orderDate: new Date(),
      id: '1',
      items: [],
    };
    jest.spyOn(orderRepo, 'create').mockImplementation(() => createOrderDto as any);
    jest.spyOn(orderRepo, 'save').mockResolvedValue(createOrderDto as any);

    expect(await service.createOrder(createOrderDto)).toEqual(createOrderDto);
  });

  it('test_update_order_item_unauthorized', async () => {
    const req = { user: { id: '2', roles: [] } };
    const orderItem = { id: '1', orderId: 'order1' };
    const order = { buyerId: '3' };

    jest.spyOn(orderItemRepo, 'findOneBy').mockResolvedValue(orderItem as any);
    jest.spyOn(orderRepo, 'findOneBy').mockResolvedValue(order as any);

    await expect(service.update(req, '1', {})).rejects.toThrow(UnauthorizedException);
  });

  it('test_remove_order_item_success', async () => {
    const req = { user: { id: '1', roles: ['ADMIN'] } };
    const orderItem = { id: '1', orderId: 'order1' };
    const order = { buyerId: '1' };

    jest.spyOn(orderItemRepo, 'findOneBy').mockResolvedValue(orderItem as any);
    jest.spyOn(orderRepo, 'findOneBy').mockResolvedValue(order as any);
    jest.spyOn(orderItemRepo, 'remove').mockResolvedValue(orderItem as any);

    expect(await service.removeOrderItem(req, '1')).toEqual(orderItem);
  });
});