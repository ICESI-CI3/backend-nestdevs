import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import {  UpdateOrderItemDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { User, UserRole } from '../user/entities/user.entity';
import { use } from 'passport';
import { ProductsService } from '../product/product.service';
import { Product } from 'src/product/model/product.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger('OrderService');
  @Inject(ProductsService)
  private readonly productService: ProductsService;
  constructor(
    @InjectRepository(Order)
      private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
      private readonly orderItemRepository: Repository<OrderItem>,
  ){}
  async createOrder(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    for (var x of order.items){
      const productId = x.productId;
      const product : Product =  await this.productService.findOne(productId);
      console.log(product.sellerId);
      console.log(order.sellerId);
      if ( product.sellerId != order.sellerId){
        throw new BadRequestException;
      }
    }
    order.accepted= false;
    return await this.ordersRepository.save(order);
  }

  async acceptOrder(req: any, id:string) {
    const user = req.user as User;
    const order : Order = await this.ordersRepository.findOneBy({id:id})
    if (user.id==order.sellerId||user.roles.includes(UserRole.ADMIN)){ 
      const order = await this.ordersRepository.preload({
        id: id,
      });
      order.accepted=true;
      if ( !order ) throw new NotFoundException(`Order Item with id: ${ id } not found`);

      try {
        await this.ordersRepository.save( order );
        return order;
        
      } catch (error) {
        this.handleDBExceptions(error);
      }
      return `This action updates a #${id} order`;
    }else{
      throw new UnauthorizedException;
    }
  }

  async createOrderItem(id :string,createOrderItemDto: CreateOrderItemDto ) {
    createOrderItemDto.orderId = id;
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    if(orderItem.product.sellerId!=orderItem.order.sellerId){
      throw new BadRequestException;
    }
    return await this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return this.ordersRepository.find(
      {
        relations: {items:true}
      }
    );
  }

  async findOne(id: string) {
    return await this.ordersRepository.findOneBy({id:id});
  }
  async findOneItem(id: string) {
    return await this.orderItemRepository.findOneBy({id:id});
  }

  async update(req:any,id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const user = req.user as User;
    const orderItem :OrderItem = await this.orderItemRepository.findOneBy({id:id})
    const order : Order = await this.ordersRepository.findOneBy({id:orderItem.orderId})
    if (order.buyerId==user.id||user.roles.includes(UserRole.ADMIN)){ 
      const order = await this.orderItemRepository.preload({
        id: id,
        ...updateOrderItemDto
      });

      if ( !order ) throw new NotFoundException(`Order Item with id: ${ id } not found`);

      try {
        await this.orderItemRepository.save( order );
        return order;
        
      } catch (error) {
        this.handleDBExceptions(error);
      }
      return `This action updates a #${id} order`;
    }else{
      throw new UnauthorizedException;
    }
  }
  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async removeOrder(req:any, id: string) { 
    const user = req.user as User;
    const order : Order = await this.ordersRepository.findOneBy({id:id});
    if (order.buyerId==user.id||user.roles.includes(UserRole.ADMIN)){    
      const order = await this.findOne(id);
      return await this.ordersRepository.remove(order);
    }
    else{
      throw new UnauthorizedException;
    }
  }
  async removeOrderItem(req:any, id: string) {
    const user = req.user as User;
    const orderItem :OrderItem = await this.orderItemRepository.findOneBy({id:id})
    const order : Order = await this.ordersRepository.findOneBy({id:orderItem.orderId})
    if (order.buyerId==user.id||user.roles.includes(UserRole.ADMIN)){ 
    const item = await this.findOneItem(id);
    return await this.orderItemRepository.remove(item);
    }else{
      throw new UnauthorizedException;
    }
  }
}
