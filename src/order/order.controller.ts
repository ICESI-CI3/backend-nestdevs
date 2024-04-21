import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderItemDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }
  @Post(':id')
  createOrderItem(@Param('id', ParseUUIDPipe) id: string,@Body() createOrderItemDto: CreateOrderItemDto, ) {
    return this.orderService.createOrderItem(id, createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.removeOrder(id);
  }
  @Delete('/item/:id')
  removeItem(@Param('id') id: string) {
    return this.orderService.removeOrderItem(id);
  }
}
